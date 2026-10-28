import {Router} from "express";
import * as messageController from "./controller/message.controller.js"
import { guard, optionalGuard } from "../../lib/auth/guard.js";
const router = Router();
router.post('/', optionalGuard, messageController.sendMessage);
router.get('/', guard, messageController.getAllMessages);

router.post('/public', guard, messageController.sendPublicMessage)
export default router;
