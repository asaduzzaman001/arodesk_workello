import { Types } from "mongoose";

export interface WorkspaceMember {
  _id?: string;
  workspaceId: Types.ObjectId;
  userId: Types.ObjectId;
  role: "OWNER" | "MEMBER";
  joinedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
