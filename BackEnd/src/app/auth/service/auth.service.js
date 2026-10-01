// ============================================
// External Dependencies (npm packages)
// ============================================
import { OAuth2Client } from 'google-auth-library';
import validator from 'validator';

// ============================================
// Repositories
// ============================================
import { createUser as createUserRecord } from '../repository/auth.repository.js';
import { findOtp } from '../repository/otp.repository.js';
import { findUserByEmail, updateUser } from '../../user/repository/user.repository.js';

// ============================================
// Services
// ============================================

// ============================================
// Utilities & Helpers
// ============================================
import { sendMail } from '../../../common/email/email.js';
import { renderWelcomeEmail } from '../../../common/email/email.temp.js';
import { comparePassword, hashPassword } from '../../../common/utils/hashing.js';
import { createAndSendOtp } from '../../../common/utils/otp.js';
import { signToken } from '../../../common/utils/utils.js';

// ============================================
// Error Handlers & Constants
// ============================================
import { invalidGoogleToken, userAlreadyExist, userAlreadyVerified, userNotExist, invalidCredentials, userNotVerified, invalidEmail, invalidOrExpiredOTP } from '../../user/error.js';

export const createUser = async (userData) => {
    if (!userData.email || !validator.isEmail(userData.email)) {

        throw invalidEmail;
    }

    const existingUser = await findUserByEmail(userData.email);
    if (existingUser) {
        throw userAlreadyExist;
    }

    userData.password = await hashPassword(userData.password, 10);
    userData.isVerified = false;

    const newUser = await createUserRecord(userData);
    await createAndSendOtp(userData.email, userData.name);
    return newUser;
};



export const otpVerify = async (email, otp) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw userNotExist;
    }

    const systemOtp = await findOtp(email);
    if (!systemOtp || systemOtp.code !== otp || systemOtp.expiresAt < Date.now()) {
        throw invalidOrExpiredOTP;
    }

    const updatedUser = await updateUser(email, { isVerified: true });
    const emailContent = await renderWelcomeEmail(user.name, 'we don`t have url XD');
    await sendMail(
        systemOtp.email,
        'Your Email has been verified',
        emailContent,
    )
    return updatedUser;
};

export const resendOtpEmail = async (email) => {
    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
        throw userNotExist;
    }
    if (existingUser.isVerified) {
        throw userAlreadyVerified;
    }
    await createAndSendOtp(email, existingUser.name);

};

export const loginUser = async (email, password) => {
    //isExist
    const user = await findUserByEmail(email);
    if (!user) {
        throw userNotExist;
    }
    //isNotVerified
    if (user.isVerified === false) {
        throw userNotVerified;
    }
    //checkPass
    const checkPass = await comparePassword(password, user.password);
    if (!checkPass) {
        throw invalidCredentials;
    }
    //generateToken
    return signToken(user);
}

export const loginWithGoogle = async (token) => {
    // verify if it comes from google
    const payload = await verifyGoogleToken(token);
    // {id, name, email, firstName, lastName , PP} 
    // if not exist create user and return token
    const existingUser = await findUserByEmail(payload.email);
    // if exist return token
    if (existingUser) {
        return signToken(existingUser);
    }
    // if not exist create user and return token
    const newUser = await createUserRecord({
        name: payload.name,
        email: payload.email,
        provider: 'google',
        isVerified: true,
    });

    return signToken(newUser);
    // make utils
    // fail case if not from google or invalid token -> throw error invalid google token
}

export const verifyGoogleToken = async (token) => {
   try {
     const googleClient = new OAuth2Client();
    const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: [process.env.GOOGLE_WEB_CLIENT_ID],

    })
    return ticket.getPayload();

}
    catch (error) {
        throw invalidGoogleToken;
    }
}

export const resetPassword = async (email, code, newPassword) => {
    const user = await findUserByEmail(email);

    if (!user) throw userNotExist;
    
    if (!user.isVerified) throw userNotVerified;

    const otp = await findOtp(email);

    if(otp.code !== code || !code) throw invalidOrExpiredOTP;
    
    const hashedPassword = await hashPassword(newPassword, 12);

    const updatedUser = await updateUser(email, { password: hashedPassword });

    return updatedUser;
}

export const sendOtpEmail = async (email) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw userNotExist;
    }
    const otp = await createAndSendOtp(email, user.name);
    await deleteOtp(email);
}
