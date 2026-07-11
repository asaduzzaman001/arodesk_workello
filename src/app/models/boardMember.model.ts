import { Schema, model, models } from "mongoose";
import type { BoardMember } from "@/app/types/boardMember.type";
import { BoardMemberRole } from "@/app/constants/enum";

const boardMemberSchema = new Schema<BoardMember>(
  {
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: [true, "Board reference is required"],
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
      enum: Object.values(BoardMemberRole),
      default: BoardMemberRole.MEMBER,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: "board_members",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Prevent duplicate board memberships
boardMemberSchema.index({ boardId: 1, userId: 1 }, { unique: true });
boardMemberSchema.index({ userId: 1, role: 1 });

const BoardMember =
  models.BoardMember || model<BoardMember>("BoardMember", boardMemberSchema);

export default BoardMember;
