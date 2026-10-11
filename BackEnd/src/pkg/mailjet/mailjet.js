import Mailjet from 'node-mailjet';
export class MailjetProvider {
    client;
    fromEmail;
    fromName;
    constructor(config) {
        this.client = new Mailjet({
            apiKey: config.apiKey,
            apiSecret: config.apiSecret
        });
        this.fromEmail = config.fromEmail;
        this.fromName = config.fromName;
    }
    async sendMail(toEmail, subject, htmlContent) {
        return this.client.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: this.fromEmail,
                        Name: this.fromName,
                    },
                    To: [
                        {
                            Email: toEmail,
                        },
                    ],
                    Subject: subject,
                    HTMLPart:
                        htmlContent,
                },
            ],
        });

    }
}  