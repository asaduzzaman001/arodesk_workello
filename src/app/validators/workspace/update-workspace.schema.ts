import { z } from "zod";

// ownerId and slug are excluded — ownership transfer and slug changes are
// higher-stakes operations that deserve their own dedicated endpoints
// rather than riding along with a general update.
export const updateWorkspaceSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Workspace name is required")
      .max(60, "Workspace name must be under 60 characters")
      .optional(),
    description: z
      .string()
      .trim()
      .max(300, "Description must be under 300 characters")
      .optional(),
    icon: z.string().optional(),
    visibility: z.enum(["PUBLIC", "PRIVATE"]).optional(),
    isArchived: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>;
