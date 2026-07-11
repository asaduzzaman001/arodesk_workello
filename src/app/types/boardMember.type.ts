import { Types } from "mongoose";

export interface BoardMember {
  _id?: string;
  boardId: Types.ObjectId | null;
  userId: Types.ObjectId | null;
  role: "OWNER" | "MEMBER";
  joinedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
