import {z} from 'zod'
import {config} from "dotenv";

config()
const schema = z.object({
    PORT: z.string().default('3000'),
    MONGO_URL : z.string(),
    SMTP_USER: z.string().trim().toLowerCase(),
    SMTP_PASSWORD: z.string(),
    JWT_SECRET : z.string(),
    GOOGLE_WEB_CLIENT_ID : z.string(),
    REDIS_PASSWORD:z.string(),
    REDIS_HOST:z.string(),
    REDIS_PORT:z.string(),
    MAILJET_API_KEY: z.string(),
    MAILJET_API_SECRET: z.string(),
    MAILJET_FROM_EMAIL: z.email(),
    MAILJET_FROM_NAME: z.string()

})
const parsed = schema.parse(process.env)

export const env = {
    port: parseInt(parsed.PORT, 10),
    db: {
        url: parsed.MONGO_URL,
    },
    google:{
        webClient : parsed.GOOGLE_WEB_CLIENT_ID,
    },
    email:{
        user: parsed.SMTP_USER,
        password: parsed.SMTP_PASSWORD,
    },
    jwt:{
        jwtSecret: parsed.JWT_SECRET,
    },
    redis:{
        redisHost: parsed.REDIS_HOST,
        redisPassword: parsed.REDIS_PASSWORD,
        redisPort: Number(parsed.REDIS_PORT),
    },
    mailjet:{
        apiKey: parsed.MAILJET_API_KEY,
        apiSecret: parsed.MAILJET_API_SECRET,
        fromEmail: parsed.MAILJET_FROM_EMAIL,
        fromName: parsed.MAILJET_FROM_NAME,
    }
}