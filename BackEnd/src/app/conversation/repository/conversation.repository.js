import Conversation from "../model/conversation.model.js";
import ConversationMessage from "../model/conversation-message.model.js";

export const createOrGetConversation = async (originalMessage, sender, receiver) => {
    return Conversation.findOneAndUpdate(
        { originalMessage },
        {
            $setOnInsert: {
                originalMessage,
                sender,
                receiver,
            },
        },
        {
            upsert: true,
            returnDocument: "after",
            runValidators: true,
        },
    );
};

export const findConversationsForUser = async (userId) => {
    return Conversation.find({
        $or: [{ sender: userId }, { receiver: userId }],
    })
        .populate("originalMessage")
        .populate("sender", "name")
        .populate("receiver", "name")
        .sort({ updatedAt: -1 });
};

export const findConversationForUser = async (conversationId, userId) => {
    return Conversation.findOne({
        _id: conversationId,
        $or: [{ sender: userId }, { receiver: userId }],
    });
};

export const createConversationMessage = async (conversation, sender, content) => {
    return ConversationMessage.create({ conversation, sender, content });
};

export const findConversationMessages = async (conversationId) => {
    return ConversationMessage.find({ conversation: conversationId })
        .populate("sender", "name")
        .sort({ createdAt: 1 });
};
