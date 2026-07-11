import { Schema, model, models } from "mongoose";
import type { Notification } from "@/app/types/notification.type";
import { NotificationType } from "@/app/constants/enum";

const notificationSchema = new Schema<Notification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Recipient reference is required"],
      index: true,
    },
    title: {
      type: String,
      required: [true, "Notification title is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: [true, "Notification type is required"],
    },
    message: {
      type: String,
      required: [true, "Notification message is required"],
      trim: true,
      maxlength: [300, "Message must be under 300 characters"],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: "notifications",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });

const Notification =
  models.Notification ||
  model<Notification>("Notification", notificationSchema);

export default Notification;
