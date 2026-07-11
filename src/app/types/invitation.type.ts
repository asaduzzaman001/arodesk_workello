import { Types } from "mongoose";

export interface Invitation {
  _id?: string;
  workspaceId: Types.ObjectId | null;
  boardId: Types.ObjectId | null;
  senderId: Types.ObjectId | null;
  receiverId?: Types.ObjectId | null;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
  message?: string;
  expiresAt: Date;
  acceptedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
