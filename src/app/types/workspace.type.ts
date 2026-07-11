import type { Types } from "mongoose";
export interface Workspace {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  visibility?: "PUBLIC" | "PRIVATE";
  ownerId: Types.ObjectId | null;
  isArchived: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
