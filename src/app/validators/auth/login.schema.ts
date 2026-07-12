import { z } from "zod";

// Accepts either an email or a username so the user can log in with
// whichever they remember. Resolve server-side (contains "@" -> email
// lookup, else username lookup).
export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginInput = z.infer<typeof loginSchema>;
