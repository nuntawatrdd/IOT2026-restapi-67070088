import { z } from "zod";
import { positiveIdSchema } from "./common.js";

export const studentIdParamsSchema = z.strictObject({
  studentId: positiveIdSchema,
});

export const studentCreateSchema = z.strictObject({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  studentCode: z.string().trim().min(1).max(20),
  birthDate: z.iso.date(), // YYYY-MM-DD
  gender: z.enum(["male", "female", "other"]),
});

export const studentUpdateSchema = studentCreateSchema
  .partial()
  .refine((s) => Object.keys(s).length > 0, {
    message: "At least one student field is required",
  });
