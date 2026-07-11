import { Schema, model, models } from "mongoose";
import type { SubTask } from "@/app/types/subTask.type";
import { TaskStatus } from "../constants/enum";

const subTaskSchema = new Schema<SubTask>(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: [true, "Task reference is required"],
      index: true,
    },
    title: {
      type: String,
      required: [true, "Subtask title is required"],
      trim: true,
      maxlength: [150, "Title must be under 150 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [300, "Description must be under 300 characters"],
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.TODO,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: "subtasks",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

subTaskSchema.index({ task: 1, position: 1 });
subTaskSchema.index({ task: 1, isCompleted: 1 });

const SubTask = models.SubTask || model<SubTask>("SubTask", subTaskSchema);

export default SubTask;
