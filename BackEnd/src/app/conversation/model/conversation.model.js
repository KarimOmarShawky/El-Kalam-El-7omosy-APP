import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema(
    {
        originalMessage: {
            type: Schema.Types.ObjectId,
            ref: "Message",
            required: true,
            unique: true,
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
    },
    { timestamps: true },
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
