import * as authService from '../service/auth.service.js';

export const createUser = async (req, res, next) => {
    try {
        const createdUser = await authService.createUser(req.body);
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
        const updatedUser = await authService.otpVerify(req.body.email , req.body.otp);
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
        const {email} = req.body;
        await authService.resendOtpEmail(email);
        res.status(200).json({
            success: true,
            message: "Otp is resented successfully",
        })
    }
    catch (error) {
        next(error);
    }
}