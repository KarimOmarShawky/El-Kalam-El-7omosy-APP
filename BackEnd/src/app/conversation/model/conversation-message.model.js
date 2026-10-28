import mongoose, { Schema } from "mongoose";

const conversationMessageSchema = new Schema(
    {
        conversation: {
            type: Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
            index: true,
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 5000,
            trim: true,
        },
    },
    { timestamps: true },
);

const ConversationMessage = mongoose.model("ConversationMessage", conversationMessageSchema);
export default ConversationMessage;
