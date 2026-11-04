import { Hono } from "hono";
import { studentsController } from "./students.js";

export const apiController = new Hono();

apiController.route("/students", studentsController);
