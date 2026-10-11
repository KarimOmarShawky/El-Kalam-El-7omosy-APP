import * as authService from '../service/auth.service.js';
import toMs from '../../../pkg/utils/time.js';
import {validateSchema} from '../../../lib/validation/validation.js';
import {registerSchema, verifyEmailSchema, resendOtpSchema, loginSchema, loginWithGoogleSchema, resetPasswordSchema, sendOtpSchema} from '../dto/auth.dto.js';
export const createUser = async (req, res, next) => {
    try {
        const validatedData = validateSchema(registerSchema, req.body);
        const createdUser = await authService.createUser(validatedData);
        res.status(201).json(
            {
                success: true,
                user: createdUser,
                message: "Successfully created user , please verify your email",
            }
        )


    }
    catch (error) {
        next(error);
    }
}

export const verifyEmail = async (req, res, next) => {
    try {
        const payload = req.body && Object.keys(req.body).length ? req.body : req.query;
        const validatedData = validateSchema(verifyEmailSchema, payload);
        const updatedUser = await authService.otpVerify(validatedData.email, validatedData.otp);
        res.status(200).json(
            {
                success: true,
                user: updatedUser,
                message: "Successfully verify email",
            }
        )
    }
    catch (error) {
        next(error);
    }
}

export const resendOtp = async (req, res, next) => {
    try {
        const payload = req.body && Object.keys(req.body).length ? req.body : req.query;
        const validatedData = validateSchema(resendOtpSchema, payload);
        await authService.resendOtpEmail(validatedData.email);
        res.status(200).json({
            success: true,
            message: "Otp is resented successfully",
        })
    }
    catch (error) {
        next(error);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const validatedData = validateSchema(loginSchema, req.body);
        const token = await authService.loginUser(validatedData.email, validatedData.password);
        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: toMs(1, 'day'),
        });
        res.status(200).json({
            success: true,
            message: "Successfully logged in",
        })
    }
    catch (error) {
        next(error);
    }   
}
export const loginWithGoogle = async (req, res, next) => {
    try {
        const validatedData = validateSchema(loginWithGoogleSchema, req.body);
        const token = await authService.loginWithGoogle(validatedData.idToken);
        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: toMs(1, 'day'),
        });
        res.status(200).json({
            success: true,
            message: "Successfully logged in with Google",
        })
    }
    catch (error) {
        next(error);
    }

    }
export const resetPassword = async (req, res, next) => {
    try {
        const validatedData = validateSchema(resetPasswordSchema, req.body);
        const updatedUser = await authService.resetPassword(validatedData.email, validatedData.code, validatedData.newPassword);
        res.status(200).json({
            success: true,
            message: "Password reset successfully",
        })
    }
    catch (error) {
        next(error);
    }
}

export const sendOtp = async (req, res, next) => {
    try {
        const payload = req.body && Object.keys(req.body).length ? req.body : req.query;
        const validatedData = validateSchema(sendOtpSchema, payload);
        await authService.sendOtpEmail(validatedData.email);
        res.status(200).json({
            success: true,
            message: "Otp is sent successfully",
        })
    }
    catch (error) {
        next(error);
    }
    
}