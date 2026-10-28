import { Types } from "mongoose"
import {z} from "zod"
export const createRequestSchema = z.object({
    message: z.string().trim().refine(
                (val)=>{
                    return Types.ObjectId.isValid(val);
                })
});

export const changeRequestStatusSchema = z.object({
    requestId: z.string().trim().refine((val) => Types.ObjectId.isValid(val)),
    status: z.enum(["accepted", "rejected"]),
});
