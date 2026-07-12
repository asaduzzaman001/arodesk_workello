import { Types } from "mongoose";

export interface Invitation {
  _id?: string;
  workspaceId: Types.ObjectId;
  boardId: Types.ObjectId;
  senderId: Types.ObjectId;
  receiverId?: Types.ObjectId | null;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
  message?: string;
  expiresAt: Date;
  acceptedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
