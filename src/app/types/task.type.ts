import { Types } from "mongoose";

export interface Task {
  _id?: string;
  boardId: Types.ObjectId | null;
  assignedBy: Types.ObjectId | null;
  assignedTo: Types.ObjectId | null;
  title: string;
  description?: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE" | "BACKLOG";
  deadline?: Date;
  startDate?: Date;
  completedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
