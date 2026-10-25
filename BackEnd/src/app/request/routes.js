import {Router} from "express";
import * as requestController from "./controller/request.controller.js"
import { guard } from "../../lib/auth/guard.js";
const router = Router();
router.post('/' , guard, requestController.createRequest);
router.get('/' , guard, requestController.getRequests);
router.put('/status' , guard, requestController.changeRequestStatus);

export default router;