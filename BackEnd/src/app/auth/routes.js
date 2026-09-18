import {Router} from "express";
import * as authController from "../auth/controller/auth.controller.js";
const router = Router();
router.post("/register", authController.createUser)
router.patch("/verify" , authController.verifyEmail)
router.get('/resendOtp', authController.resendOtp)
export default router;
