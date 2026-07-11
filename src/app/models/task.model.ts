import { Schema, model, models } from "mongoose";
import type { Task } from "@/app/types/task.type";
import { TaskPriority, TaskStatus } from "@/app/constants/enum";

const taskSchema = new Schema<Task>(
  {
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: [true, "Board reference is required"],
      index: true,
    },
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: [150, "Title must be under 150 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, "Description must be under 2000 characters"],
      default: "",
    },
    deadline: {
      type: Date,
      default: null,
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.MEDIUM,
    },
    // Recalculated by the service/action layer whenever subtasks change
    // or the deadline passes. Never write this directly from a partial diff.
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.TODO,
      index: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Task creator is required"],
    },
    startDate: {
      type: Date,
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: "tasks",
    optimisticConcurrency: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

taskSchema.index({ board: 1, status: 1, position: 1 });
taskSchema.index({ board: 1, deadline: 1 });
taskSchema.index({ assignedTo: 1, status: 1 });

// Virtual: subtasks belonging to this task (must be explicitly populated)
taskSchema.virtual("subtasks", {
  ref: "SubTask",
  localField: "_id",
  foreignField: "task",
});

// Virtual: progress percentage — only accurate if `subtasks` was populated.
// Returns undefined (not 0) when subtasks aren't populated, so callers
// don't mistake "not loaded" for "no subtasks completed".
taskSchema.virtual("progress").get(function (
  this: Task & { subtasks?: { isCompleted: boolean }[] },
) {
  if (!this.subtasks || !Array.isArray(this.subtasks)) return undefined;
  const total = this.subtasks.length;
  if (total === 0) return 0;
  const completed = this.subtasks.filter((s) => s.isCompleted).length;
  return Math.round((completed / total) * 100);
});

const Task = models.Task || model<Task>("Task", taskSchema);

export default Task;
