import { z } from "zod";
import { objectIdSchema } from "../objectId.schema";

// createdBy is excluded — set server-side from the authenticated session.
export const createBoardSchema = z.object({
  workspaceId: objectIdSchema,
  name: z
    .string()
    .trim()
    .min(1, "Board name is required")
    .max(60, "Board name must be under 60 characters"),
  description: z
    .string()
    .trim()
    .max(300, "Description must be under 300 characters")
    .optional()
    .default(""),
  color: z.string().optional(),
  icon: z.string().optional(),
});

export type CreateBoardInput = z.infer<typeof createBoardSchema>;
