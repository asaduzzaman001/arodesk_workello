import { Schema, model, models } from "mongoose";
import type { Workspace } from "@/app/types/workspace.type";

const workspaceSchema = new Schema<Workspace>(
  {
    name: {
      type: String,
      required: [true, "Workspace name is required"],
      trim: true,
      maxlength: [60, "Workspace name must be under 60 characters"],
    },
    slug: {
      type: String,
      required: [true, "Workspace slug is required"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^[a-z0-9-]+$/,
        "Slug can only contain lowercase letters, numbers, and hyphens",
      ],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [300, "Description must be under 300 characters"],
      default: "",
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Workspace owner is required"],
      index: true,
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: "workspaces",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

workspaceSchema.index({ slug: 1 }, { unique: true });
workspaceSchema.index({ ownerId: 1, createdAt: -1 });

// Virtual: boards belonging to this workspace (populate on demand)
workspaceSchema.virtual("boards", {
  ref: "Board",
  localField: "_id",
  foreignField: "workspace",
});

const Workspace =
  models.Workspace || model<Workspace>("Workspace", workspaceSchema);

export default Workspace;
