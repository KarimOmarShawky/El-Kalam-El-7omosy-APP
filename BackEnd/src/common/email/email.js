import nodemailer from 'nodemailer'
import {config} from "dotenv";
config();
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
export const sendMail = async (to ,subject, html) => {
    const info = await transporter.sendMail({
        from: `"Security Team" <no-reply@El-Kalam.com>`,
        to: to,
        subject: subject,
        html: html,

    })
    return info;
}