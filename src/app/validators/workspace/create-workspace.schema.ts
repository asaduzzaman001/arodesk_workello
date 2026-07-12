import { z } from "zod";

// ownerId is excluded — set server-side from the authenticated session.
export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Workspace name is required")
    .max(60, "Workspace name must be under 60 characters"),
  // Optional: if omitted, the server should derive a unique slug from `name`.
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens",
    )
    .optional(),
  description: z
    .string()
    .trim()
    .max(300, "Description must be under 300 characters")
    .optional()
    .default(""),
  icon: z.string().optional(),
  visibility: z.enum(["PUBLIC", "PRIVATE"]).optional().default("PRIVATE"),
});

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
