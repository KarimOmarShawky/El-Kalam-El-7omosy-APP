import * as messageService from "../service/message.service.js"
import { sendMessageSchema } from "../dto/message.dto.js"
import { validateSchema } from "../../../lib/validation/validation.js"

export const sendMessage = async (req, res, next) => {
    try {
        const data = validateSchema(sendMessageSchema, req.body);
        const {content, receiver} = data;
        const sender = req.user?.id;
        const cretedMessage = await messageService.sendMessage(content , sender , receiver);
        res.status(201).json({
            message : "Message created successfully",
            success : true,
            data : cretedMessage,
        })
    } catch (error) {
        next(error);
    }}

