import { Types } from "mongoose";

export interface Notification {
  _id?: string;
  userId: Types.ObjectId;
  title: string;
  message: string;
  type: "INVITATION" | "TASK" | "WORKSPACE" | "SYSTEM";
  isRead: boolean;
  actionUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
