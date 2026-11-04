import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { studentCreateSchema, studentIdParamsSchema, studentUpdateSchema } from "../schemas/students.js";
import {
  createStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  updateStudent,
} from "../services/students.js";

export const studentsController = new Hono();

// PostgreSQL unique_violation
const isDuplicate = (e: unknown) =>
  (e as { code?: string; cause?: { code?: string } })?.code === "23505" ||
  (e as { cause?: { code?: string } })?.cause?.code === "23505";

const DUP = { error: "studentCode already exists" };

studentsController.get("/", async (c) => c.json(await getStudents()));

studentsController.get("/:studentId", zValidator("param", studentIdParamsSchema), async (c) => {
  const student = await getStudentById(c.req.valid("param").studentId);
  if (!student) return c.json({ error: "Student not found" }, 404);
  return c.json(student);
});

studentsController.post("/", zValidator("json", studentCreateSchema), async (c) => {
  try {
    const student = await createStudent(c.req.valid("json"));
    c.header("Location", `/api/v1/students/${student.id}`);
    return c.json(student, 201);
  } catch (e) {
    if (isDuplicate(e)) return c.json(DUP, 409);
    throw e;
  }
});

studentsController.patch(
  "/:studentId",
  zValidator("param", studentIdParamsSchema),
  zValidator("json", studentUpdateSchema),
  async (c) => {
    try {
      const student = await updateStudent(c.req.valid("param").studentId, c.req.valid("json"));
      if (!student) return c.json({ error: "Student not found" }, 404);
      return c.json(student);
    } catch (e) {
      if (isDuplicate(e)) return c.json(DUP, 409);
      throw e;
    }
  },
);

studentsController.delete("/:studentId", zValidator("param", studentIdParamsSchema), async (c) => {
  const ok = await deleteStudent(c.req.valid("param").studentId);
  if (!ok) return c.json({ error: "Student not found" }, 404);
  return c.body(null, 204);
});
