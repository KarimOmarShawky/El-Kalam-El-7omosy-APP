import {z} from 'zod';
import { AppError } from '../error/error.js';
export const validateSchema = (schema, data) => {
    const result = schema.safeParse(data);
    if(!result.success ) {
        //handle validation error
        const errMessages = result.error.issues.map(issue => `${issue.path[0]} : ${issue.message}`);
        throw new AppError(`Validation Error: ${errMessages.join(', ')}`, 400);
    }
    return result.data;
}