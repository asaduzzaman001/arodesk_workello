import { z } from "zod";

/**
 * Validates a 24-char hex Mongo ObjectId string as received from a request
 * body / route param / query string. Kept as a plain string (not
 * transformed into Types.ObjectId) since request schemas validate raw
 * client input — conversion to ObjectId happens at the persistence layer.
 */
export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid id");

export type ObjectIdInput = z.infer<typeof objectIdSchema>;
