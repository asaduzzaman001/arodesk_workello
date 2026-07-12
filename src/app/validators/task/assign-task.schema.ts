import { z } from "zod";
import { objectIdSchema } from "../objectId.schema";

// Kept as its own endpoint (separate from update-task) so assignment —
// which likely triggers a notification and an Activity log entry — is an
// explicit, auditable action rather than an incidental field in a general edit.
export const assignTaskSchema = z.object({
  taskId: objectIdSchema,
  // null explicitly unassigns the task.
  assignedTo: objectIdSchema.nullable(),
});

export type AssignTaskInput = z.infer<typeof assignTaskSchema>;
