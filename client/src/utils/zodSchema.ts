import { z } from "zod";

const taskSchema = z.object({
  title: z.string().min(1, "Title must be min of 1 character").optional(),
  description: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETE"]).default("TODO"),
  priority: z.enum(["P1", "P2", "P3", "P4"]).default("P4"),
  dueDate: z.date().optional(),
});

export default taskSchema;
