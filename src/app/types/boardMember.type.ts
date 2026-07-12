import { Types } from "mongoose";

export interface BoardMember {
  _id?: string;
  boardId: Types.ObjectId;
  userId: Types.ObjectId;
  role: "OWNER" | "MEMBER";
  joinedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
