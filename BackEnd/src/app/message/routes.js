import {Router} from "express";
import * as messageController from "./controller/message.controller.js"
import { guard } from "../../lib/auth/guard.js";
const router = Router();
router.post('/' , messageController.sendMessage);

router.post('/public' , guard, messageController.sendMessage)
export default router;
