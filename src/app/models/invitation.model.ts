import { Schema, model, models } from "mongoose";
import type { Invitation } from "@/app/types/invitation.type";
import { InvitationStatus } from "@/app/constants/enum";

const invitationSchema = new Schema<Invitation>(
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
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Inviter reference is required"],
      index: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Invited user reference is required"],
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(InvitationStatus),
      default: InvitationStatus.PENDING,
    },
    message: {
      type: String,
      default: "",
    },
    expiresAt: {
      type: Date,
      required: [true, "Invitation expiration date is required"],
    },
    acceptedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: "invitations",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Prevent duplicate PENDING board invitations to the same user
invitationSchema.index(
  { boardId: 1, invitedUser: 1, status: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: InvitationStatus.PENDING,
      boardId: { $type: "objectId" },
    },
  },
);

// Prevent duplicate PENDING workspace invitations to the same user
invitationSchema.index(
  { workspaceId: 1, invitedUser: 1, status: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: InvitationStatus.PENDING,
      workspaceId: { $type: "objectId" },
    },
  },
);

invitationSchema.index({ invitedUser: 1, status: 1, createdAt: -1 });

const Invitation =
  models.Invitation || model<Invitation>("Invitation", invitationSchema);

export default Invitation;
