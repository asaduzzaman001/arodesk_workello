import { z } from "zod";
import { objectIdSchema } from "../objectId.schema";

// assignedBy is excluded — set server-side from the authenticated session.
// status is excluded — a new task starts at the default status server-side
// and is otherwise recalculated by the service layer (see the Task model's
// own comment above its `status` field), never chosen directly by the client.
export const createTaskSchema = z
  .object({
    boardId: objectIdSchema,
    title: z
      .string()
      .trim()
      .min(1, "Task title is required")
      .max(150, "Title must be under 150 characters"),
    description: z
      .string()
      .trim()
      .max(2000, "Description must be under 2000 characters")
      .optional()
      .default(""),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional().default("MEDIUM"),
    assignedTo: objectIdSchema.nullable().optional(),
    deadline: z.coerce.date().nullable().optional(),
    startDate: z.coerce.date().nullable().optional(),
  })
  .refine(
    (data) =>
      !data.deadline || !data.startDate || data.deadline >= data.startDate,
    {
      message: "Deadline cannot be before the start date",
      path: ["deadline"],
    },
  );

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
