import { AppError } from "../../../lib/error/error.js";
import * as conversationRepository from "../repository/conversation.repository.js";

export const createForAcceptedReveal = async (originalMessage, sender, receiver) => {
    return conversationRepository.createOrGetConversation(originalMessage, sender, receiver);
};

export const getConversations = async (userId) => {
    return conversationRepository.findConversationsForUser(userId);
};

export const sendMessage = async (conversationId, senderId, content) => {
    const conversation = await conversationRepository.findConversationForUser(
        conversationId,
        senderId,
    );
    if (!conversation) {
        throw new AppError("Conversation not found", 404);
    }

    return conversationRepository.createConversationMessage(conversation._id, senderId, content);
};

export const getMessages = async (conversationId, userId) => {
    const conversation = await conversationRepository.findConversationForUser(
        conversationId,
        userId,
    );
    if (!conversation) {
        throw new AppError("Conversation not found", 404);
    }

    return conversationRepository.findConversationMessages(conversation._id);
};
