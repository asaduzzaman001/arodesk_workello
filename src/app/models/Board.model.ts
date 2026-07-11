import { Schema, model, models } from "mongoose";
import type { Board } from "@/app/types/board.type";

const boardSchema = new Schema<Board>(
  {
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: [true, "Workspace reference is required"],
      index: true,
    },
    name: {
      type: String,
      required: [true, "Board name is required"],
      trim: true,
      maxlength: [60, "Board name must be under 60 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [300, "Description must be under 300 characters"],
      default: "",
    },
    color: {
      type: String,
      default: null,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Board creator is required"],
      index: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: "boards",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

boardSchema.index({ workspaceId: 1, createdAt: -1 });
boardSchema.index({ workspaceId: 1, isArchived: 1 });

// Virtual: tasks belonging to this board
boardSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "board",
});

// Virtual: members belonging to this board
boardSchema.virtual("members", {
  ref: "BoardMember",
  localField: "_id",
  foreignField: "board",
});

const Board = models.Board || model<Board>("Board", boardSchema);

export default Board;
