import { validateSchema } from "../../../lib/validation/validation.js";
import {
    conversationIdSchema,
    sendConversationMessageSchema,
} from "../dto/conversation.dto.js";
import * as conversationService from "../service/conversation.service.js";

export const getConversations = async (req, res, next) => {
    try {
        const conversations = await conversationService.getConversations(req.user.id);
        res.status(200).json({
            success: true,
            data: conversations,
        });
    } catch (error) {
        next(error);
    }
};

export const sendMessage = async (req, res, next) => {
    try {
        const { conversationId } = validateSchema(conversationIdSchema, req.params);
        const { content } = validateSchema(sendConversationMessageSchema, req.body);
        const message = await conversationService.sendMessage(
            conversationId,
            req.user.id,
            content,
        );
        res.status(201).json({
            success: true,
            data: message,
        });
    } catch (error) {
        next(error);
    }
};

export const getMessages = async (req, res, next) => {
    try {
        const { conversationId } = validateSchema(conversationIdSchema, req.params);
        const messages = await conversationService.getMessages(conversationId, req.user.id);
        res.status(200).json({
            success: true,
            data: messages,
        });
    } catch (error) {
        next(error);
    }
};
