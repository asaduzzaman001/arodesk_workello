import { z } from "zod";

// workspaceId is excluded — moving a board between workspaces should be a
// dedicated, explicit operation rather than a side effect of a general edit.
export const updateBoardSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Board name is required")
      .max(60, "Board name must be under 60 characters")
      .optional(),
    description: z
      .string()
      .trim()
      .max(300, "Description must be under 300 characters")
      .optional(),
    color: z.string().optional(),
    icon: z.string().optional(),
    isArchived: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export type UpdateBoardInput = z.infer<typeof updateBoardSchema>;
