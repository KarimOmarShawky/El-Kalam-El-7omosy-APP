import { Types } from "mongoose"
import {z} from "zod"

export const sendMessageSchema = z.object(
    {
        content: z.string().trim().min(2).max(500),
        receiver: z.string().trim().refine(
            (val)=>{
                return Types.ObjectId.isValid(val);
            }
        )
    }
)