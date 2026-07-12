import { z } from "zod";
import { objectIdSchema } from "../objectId.schema";

// completedBy is intentionally NOT accepted from the client — the server
// should set it to the authenticated user's id when isCompleted is true,
// and clear it to null when isCompleted is false.
export const toggleSubtaskSchema = z.object({
  subtaskId: objectIdSchema,
  isCompleted: z.boolean(),
});

export type ToggleSubtaskInput = z.infer<typeof toggleSubtaskSchema>;
