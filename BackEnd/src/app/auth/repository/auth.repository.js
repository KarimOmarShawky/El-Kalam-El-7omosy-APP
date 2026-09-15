import OTP from '../model/otp.model.js';
import crypto from "crypto";
export const createOtp = async (email, minutes = 5) => {
    const otp = crypto.randomInt(100000, 1000000).toString();

    await OTP.deleteOne({ email });

    return OTP.create({
        code: otp,
        email,
        expiresAt: new Date(Date.now() + minutes * 60 * 1000)
    });
};