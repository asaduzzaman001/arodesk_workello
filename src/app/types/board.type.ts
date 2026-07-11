import { Types } from "mongoose";

export interface Board {
  _id?: string;
  workspaceId: Types.ObjectId | null;
  name: string;
  description: string;
  createdBy: Types.ObjectId | null;
  color?: string;
  icon?: string;
  isArchived: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
