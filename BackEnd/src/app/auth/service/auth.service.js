import * as authRepository from '../repository/auth.repository.js';
import * as userRepository from '../../user/repository/user.repository.js';
import * as OTPRepository from '../repository/otp.repository.js';
import {sendMail} from '../../../common/email/email.js'
import * as emailTemplate from '../../../common/email/email.temp.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import validator from 'validator';


export const createUser = async (userData) => {
    if (!userData.email || !validator.isEmail(userData.email)) {
        throw new Error("invalid email");
    }

    const existingUser = await userRepository.findUserByEmail(userData.email);
    if (existingUser) {
        throw new Error("Email already exists");
    }

    userData.password = await bcrypt.hash(userData.password, 10);
    userData.isVerified = false;

    const newUser = await authRepository.createUser(userData);
    const otp = crypto.randomInt(0, 1000000).toString().padStart(6, "0");
    const createdOTP = await OTPRepository.createOtp(userData.email , otp);
    const emailContent = await emailTemplate.renderOtpEmail(userData.name , createdOTP.code);
    await sendMail(
        createdOTP.email ,
        'Verify your email',
        emailContent,
    )
    return newUser;
};



export const otpVerify = async (email, otp) => {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        throw new Error("User is not found");
    }

    const systemOtp = await OTPRepository.findOtp(email);
    if (!systemOtp || systemOtp.code !== otp || systemOtp.expiresAt < Date.now()) {
        throw new Error("Invalid or expired OTP");
    }

    const updatedUser =await userRepository.updateUser(email, { isVerified: true });
    const emailContent = await emailTemplate.renderWelcomeEmail(user.name , 'we don`t have url XD');
    await sendMail(
        systemOtp.email ,
        'Your Email has been verified',
        emailContent,
    )
    return updatedUser;
};

export const resendOtpEmail = async (email) => {
    const existingUser = await userRepository.findUserByEmail(email);
    if (!existingUser) {
        throw new Error("User is not found");
    }
    if (existingUser.isVerified) {
        throw new Error("User is already verified");
    }
    const otp = crypto.randomInt(0, 1000000).toString().padStart(6, "0");
    const createdOTP = await OTPRepository.createOtp(email , otp);
    const emailContent = await emailTemplate.renderOtpEmail(existingUser.name , createdOTP.code);
    await sendMail(
        createdOTP.email ,
        'Verify your email',
        emailContent,
    )
}