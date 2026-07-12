import { Types } from "mongoose";

export interface Activity {
  _id?: string;
  workspaceId: Types.ObjectId;
  boardId?: Types.ObjectId | null;
  taskId?: Types.ObjectId | null;
  subTaskId?: Types.ObjectId | null;
  userId: Types.ObjectId;
  action:
    | "CREATE"
    | "UPDATE"
    | "DELETE"
    | "ASSIGN"
    | "UNASSIGN"
    | "COMPLETE"
    | "INCOMPLETE";
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
