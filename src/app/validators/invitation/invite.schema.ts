import { z } from "zod";
import { objectIdSchema } from "../objectId.schema";

// senderId is excluded — set server-side from the authenticated session.
// An invitation is scoped to exactly one of workspace or board (this
// mirrors the two partial-unique indexes on the Invitation model, which
// each assume the other id is absent) — never both, never neither.
export const inviteSchema = z
  .object({
    workspaceId: objectIdSchema.nullable().optional(),
    boardId: objectIdSchema.nullable().optional(),
    receiverId: objectIdSchema,
    message: z
      .string()
      .trim()
      .max(500, "Message must be under 500 characters")
      .optional(),
    // If omitted, the server should default this (e.g. now + 7 days).
    expiresAt: z.coerce.date().optional(),
  })
  .refine((data) => Boolean(data.workspaceId) !== Boolean(data.boardId), {
    message:
      "Provide exactly one of workspaceId or boardId, not both or neither",
    path: ["workspaceId"],
  });

export type InviteInput = z.infer<typeof inviteSchema>;
