import crypto from 'crypto';
import * as OTPRepository from '../../app/auth/repository/otp.repository.js';
import { sendMail } from '../email/email.js';
import * as emailTemplate from '../email/email.temp.js';

export const createAndSendOtp = async (email, userName) => {
	const otp = crypto.randomInt(0, 1000000).toString().padStart(6, '0');
	const createdOTP = await OTPRepository.createOtp(email, otp);
	const emailContent = await emailTemplate.renderOtpEmail(userName, createdOTP.code);
	await sendMail(
		createdOTP.email,
		'Verify your email',
		emailContent,
	);
    return createdOTP;
};
