import { date, integer, pgTable, text, unique } from "drizzle-orm/pg-core";

export const students = pgTable(
  "students",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    studentCode: text("student_code").notNull(),
    birthDate: date("birth_date").notNull(),
    gender: text("gender", { enum: ["male", "female", "other"] }).notNull(),
  },
  (table) => [unique("students_student_code_unique").on(table.studentCode)],
);

export type Student = typeof students.$inferSelect;
export type NewStudent = typeof students.$inferInsert;
