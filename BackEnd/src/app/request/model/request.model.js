import mongoose, { Schema } from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    message: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

requestSchema.index({ message: 1, receiver: 1 }, { unique: true });

export const Request = mongoose.model("Request", requestSchema);
export default Request;
