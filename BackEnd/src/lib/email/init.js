import {MailjetProvider} from "../../pkg/mailjet/mailjet.js";
import {env} from "../config/env.js";
export const mailjet = new MailjetProvider({
    apiKey: env.mailjet.apiKey,
    apiSecret: env.mailjet.apiSecret,
    fromEmail: env.mailjet.fromEmail,
    fromName: env.mailjet.fromName
});