import { Types } from "mongoose";

export interface Board {
  _id?: string;
  workspaceId: Types.ObjectId;
  name: string;
  description: string;
  createdBy: Types.ObjectId;
  color?: string;
  icon?: string;
  isArchived: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
