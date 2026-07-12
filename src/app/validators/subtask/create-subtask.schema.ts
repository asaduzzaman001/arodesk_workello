import { z } from "zod";
import { objectIdSchema } from "../objectId.schema";

// position is excluded — the server should compute it (e.g. append to the
// end of the subtask list) rather than trust a client-supplied order index.
export const createSubtaskSchema = z.object({
  taskId: objectIdSchema,
  title: z
    .string()
    .trim()
    .min(1, "Subtask title is required")
    .max(150, "Title must be under 150 characters"),
  description: z
    .string()
    .trim()
    .max(300, "Description must be under 300 characters")
    .optional(),
});

export type CreateSubtaskInput = z.infer<typeof createSubtaskSchema>;
