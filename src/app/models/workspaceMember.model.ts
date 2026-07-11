import { Schema, model, models } from "mongoose";
import type { WorkspaceMember } from "@/app/types/workspaceMember.type";
import { WorkspaceMemberRole } from "@/app/constants/enum";

const workspaceMemberSchema = new Schema<WorkspaceMember>(
  {
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: [true, "Workspace reference is required"],
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      index: true,
    },
    role: {
      type: String,
      enum: Object.values(WorkspaceMemberRole),
      default: WorkspaceMemberRole.MEMBER,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: "workspace_members",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Prevent duplicate workspace memberships
workspaceMemberSchema.index({ workspace: 1, user: 1 }, { unique: true });
workspaceMemberSchema.index({ user: 1, role: 1 });

const WorkspaceMember =
  models.WorkspaceMember ||
  model<WorkspaceMember>("WorkspaceMember", workspaceMemberSchema);

export default WorkspaceMember;
