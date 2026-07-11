import { Types } from "mongoose";

export interface WorkspaceMember {
  _id?: string;
  workspaceId: Types.ObjectId | null;
  userId: Types.ObjectId | null;
  role: "OWNER" | "MEMBER";
  joinedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
