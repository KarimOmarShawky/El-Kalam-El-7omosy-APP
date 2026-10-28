import * as messageService from "../service/message.service.js"
import { sendMessageSchema } from "../dto/message.dto.js"
import { validateSchema } from "../../../lib/validation/validation.js"

const createMessage = async (req, res, next, messageType) => {
    try {
        const data = validateSchema(sendMessageSchema, req.body);
        const {content, receiver} = data;
        const sender = req.user?.id;
        const createdMessage = await messageService.sendMessage(
            content,
            sender,
            receiver,
            messageType,
        );
        res.status(201).json({
            message : "Message created successfully",
            success : true,
            data : createdMessage,
        })
    } catch (error) {
        next(error);
    }
}

export const sendMessage = (req, res, next) => createMessage(req, res, next, "anonymous");
export const sendPublicMessage = (req, res, next) => createMessage(req, res, next, "public");

export const getAllMessages = async (req, res, next) => {
    try {
        const messages = await messageService.getAllMessages(req.user.id);
        res.status(200).json({
            message: "Messages retrieved successfully",
            success: true,
            data: messages,
        });
    } catch (error) {
        next(error);
    }
}

