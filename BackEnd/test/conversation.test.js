import assert from "node:assert/strict";
import { test } from "node:test";
import mongoose from "mongoose";
import Conversation from "../src/app/conversation/model/conversation.model.js";
import ConversationMessage from "../src/app/conversation/model/conversation-message.model.js";
import {
    conversationIdSchema,
    sendConversationMessageSchema,
} from "../src/app/conversation/dto/conversation.dto.js";

test("conversation stores the original message and both participants", async () => {
    const conversation = new Conversation({
        originalMessage: new mongoose.Types.ObjectId(),
        sender: new mongoose.Types.ObjectId(),
        receiver: new mongoose.Types.ObjectId(),
    });

    await assert.doesNotReject(conversation.validate());
});

test("conversation messages require a conversation, sender, and content", async () => {
    const message = new ConversationMessage({
        conversation: new mongoose.Types.ObjectId(),
        sender: new mongoose.Types.ObjectId(),
        content: "Hello!",
    });

    await assert.doesNotReject(message.validate());
    await assert.rejects(
        new ConversationMessage({
            conversation: new mongoose.Types.ObjectId(),
            sender: new mongoose.Types.ObjectId(),
            content: "   ",
        }).validate(),
    );
});

test("conversation endpoints validate IDs and message content", () => {
    assert.equal(
        conversationIdSchema.safeParse({
            conversationId: new mongoose.Types.ObjectId().toString(),
        }).success,
        true,
    );
    assert.equal(
        conversationIdSchema.safeParse({ conversationId: "not-an-id" }).success,
        false,
    );
    assert.equal(sendConversationMessageSchema.safeParse({ content: "Hello!" }).success, true);
    assert.equal(sendConversationMessageSchema.safeParse({ content: "   " }).success, false);
});
