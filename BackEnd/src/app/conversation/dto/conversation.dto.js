import { Types } from "mongoose";
import { z } from "zod";

export const conversationIdSchema = z.object({
    conversationId: z.string().trim().refine(Types.ObjectId.isValid),
});

export const sendConversationMessageSchema = z.object({
    content: z.string().trim().min(1).max(5000),
});
