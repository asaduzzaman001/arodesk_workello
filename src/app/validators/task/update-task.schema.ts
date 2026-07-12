import { z } from "zod";

// status is deliberately excluded. Per the Task model's own comment, status
// is "recalculated by the service/action layer whenever subtasks change or
// the deadline passes" and must never be written from a partial diff — use
// a dedicated status-transition endpoint instead.
// assignedTo is excluded — reassignment goes through assign-task.schema.ts
// so it stays an explicit, auditable action (e.g. for notifications/activity
// logging) rather than a silent side effect of an unrelated edit.
export const updateTaskSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Task title is required")
      .max(150, "Title must be under 150 characters")
      .optional(),
    description: z
      .string()
      .trim()
      .max(2000, "Description must be under 2000 characters")
      .optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    deadline: z.coerce.date().nullable().optional(),
    startDate: z.coerce.date().nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  })
  .refine(
    (data) =>
      !data.deadline || !data.startDate || data.deadline >= data.startDate,
    {
      message: "Deadline cannot be before the start date",
      path: ["deadline"],
    },
  );

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
