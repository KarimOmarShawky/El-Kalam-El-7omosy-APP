import { Router } from "express";
import { guard } from "../../lib/auth/guard.js";
import * as conversationController from "./controller/conversation.controller.js";

const router = Router();

router.use(guard);
router.get("/", conversationController.getConversations);
router.post("/:conversationId/messages", conversationController.sendMessage);
router.get("/:conversationId/messages", conversationController.getMessages);

export default router;
