import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const emailsDir = path.join(__dirname, '..', '..', 'views', 'emails');

export async function renderOtpEmail(userName, otpCode) {
    const templatePath = path.join(emailsDir, 'otp.email.ejs');
    return await ejs.renderFile(templatePath, {
        userName,
        otpCode,
        expiresInMinutes: 5
    });
}

export async function renderWelcomeEmail(userName, dashboardUrl) {
    const templatePath = path.join(emailsDir, 'otp.verify.ejs'); // غيّر الاسم حسب ملفك
    return await ejs.renderFile(templatePath, {
        userName,
        dashboardUrl
    });
}