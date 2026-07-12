import { z } from "zod";

// isCompleted / completedBy are excluded — completion is its own action,
// see toggle-subtask.schema.ts, so it stays auditable and can't be smuggled
// in through an unrelated title/description edit.
export const updateSubtaskSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Subtask title is required")
      .max(150, "Title must be under 150 characters")
      .optional(),
    description: z
      .string()
      .trim()
      .max(300, "Description must be under 300 characters")
      .optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE", "BACKLOG"]).optional(),
    position: z
      .number()
      .int()
      .min(0, "Position must be zero or greater")
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export type UpdateSubtaskInput = z.infer<typeof updateSubtaskSchema>;
