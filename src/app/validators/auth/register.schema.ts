import { z } from "zod";

const passwordRule = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/\d/, "Password must contain a number");

// role and isVerified are intentionally excluded — a new account is always
// MEMBER / unverified server-side, never chosen by the client.
export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(50, "Name must be under 50 characters"),
    username: z
      .string()
      .trim()
      .toLowerCase()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be under 20 characters")
      .regex(
        /^[a-z0-9_]+$/,
        "Username can only contain lowercase letters, numbers, and underscores",
      ),
    email: z.string().trim().toLowerCase().email("Invalid email address"),
    password: passwordRule,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
