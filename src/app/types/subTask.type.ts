import type { Types } from "mongoose";
export interface SubTask {
  _id?: string;
  taskId: Types.ObjectId | null;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "BACKLOG";
  isCompleted: boolean;
  completedBy?: Types.ObjectId | null;
  position: number;
  createdAt?: Date;
  updatedAt?: Date;
}
