import {Router} from "express";
import * as authController from "../auth/controller/auth.controller.js";
const router = Router();
router.post("/register", authController.createUser)
router.patch("/verify" , authController.verifyEmail)
router.get("/send-Otp", authController.sendOtp)
router.get('/resend-Otp', authController.resendOtp)
router.post('/login', authController.loginUser)
router.post('/login-with-google', authController.loginWithGoogle)
router.post('/reset-password', authController.resetPassword)
export default router;
