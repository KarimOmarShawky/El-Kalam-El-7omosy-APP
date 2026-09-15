import OTP from '../model/otp.model.js';
import crypto from "crypto";
export const createOtp = async (email, minutes) => {
    const otp = crypto.randomInt(100000, 1000000).toString();
    return await OTP.create({
        code : otp,
        email : email,
        expiresAt: new Date(Date.now() + minutes * 60 * 1000)
    })
}
