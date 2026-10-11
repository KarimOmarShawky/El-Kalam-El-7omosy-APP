import crypto from 'crypto';
import * as OTPRepository from '../../app/auth/repository/otp.repository.js';
import * as emailTemplate from '../email/email.temp.js';
import { mailjet } from '../email/init.js';

export const createAndSendOtp = async (email, userName) => {
	const otp = crypto.randomInt(0, 1000000).toString().padStart(6, '0');
	const createdOTP = await OTPRepository.createOtp(email, otp);
	const emailContent = await emailTemplate.renderOtpEmail(userName, createdOTP.code);

	try {
		await mailjet.sendMail(
			createdOTP.email,
			'Verify your email',
			emailContent,
		);
	} catch (error) {
		console.warn('Failed to send OTP email:', error.message || error);
	}

	return createdOTP;
};
