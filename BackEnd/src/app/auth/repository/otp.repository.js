import {OTP} from '../model/otp.model.js';

import * as time from "../../../common/utils/time.js";
import * as authRepository from "./auth.repository.js";
export const createOtp = async (email , code , minutes = 5) => {
    return await OTP.create({
        code: code,
        email,
        expiresAt: new Date(Date.now() +  time.toMS(minutes , 'minute'))
    });
};

export const findOtp = async (email) => {
    return  await OTP.findOne({ email });

}