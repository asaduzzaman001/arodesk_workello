import { Schema, model, models } from "mongoose";
import type { Activity } from "@/app/types/activity.type";
import { ActivityAction } from "@/app/constants/enum";

const activitySchema = new Schema<Activity>(
  {
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      default: null,
      index: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      default: null,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Actor reference is required"],
      index: true,
    },
    action: {
      type: String,
      enum: Object.values(ActivityAction),
      required: [true, "Activity action is required"],
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: "activities",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

activitySchema.index({ boardId: 1, createdAt: -1 });
activitySchema.index({ workspaceId: 1, createdAt: -1 });
activitySchema.index({ userId: 1, createdAt: -1 });

const Activity = models.Activity || model<Activity>("Activity", activitySchema);

export default Activity;
