import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const emailsDir = path.join(__dirname, '..', '..', 'views', 'emails');

function fallbackOtpHtml(userName, otpCode) {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; color: #111827;">
            <h2>Hello ${userName},</h2>
            <p>Your verification code is:</p>
            <p style="font-size: 32px; font-weight: 700; letter-spacing: 8px; text-align: center; margin: 20px 0;">${otpCode}</p>
            <p>This code expires in 5 minutes.</p>
        </div>
    `;
}

function fallbackWelcomeHtml(userName, dashboardUrl) {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; color: #111827;">
            <h2>Welcome ${userName}!</h2>
            <p>Your email has been verified successfully.</p>
            <p><a href="${dashboardUrl || '#'}">Open dashboard</a></p>
        </div>
    `;
}
function accountLockHtml(userName) {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; color: #111827;">
            <h2>Hello ${userName},</h2>
            <p>Your account has been locked due to multiple failed login attempts.</p>
            <p>Please try again later or contact support if you need assistance.</p>
        </div>
    `;
}

export async function renderOtpEmail(userName, otpCode) {
    const templatePath = path.join(emailsDir, 'otp.email.ejs');

    try {
        return await ejs.renderFile(templatePath, {
            userName,
            otpCode,
            expiresInMinutes: 5,
        });
    } catch {
        return fallbackOtpHtml(userName, otpCode);
    }
}

export async function renderWelcomeEmail(userName, dashboardUrl) {
    const templatePath = path.join(emailsDir, 'otp.verify.ejs');

    try {
        return await ejs.renderFile(templatePath, {
            userName,
            dashboardUrl,
        });
    } catch {
        return fallbackWelcomeHtml(userName, dashboardUrl);
    }
}

