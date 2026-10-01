import {AppError} from "../../common/error/error.js";
export const userNotExist = new AppError('User Not Exists.', 404);
export const userAlreadyExist = new AppError('User Already Exists.', 409);
export const userAlreadyVerified = new AppError('User Already Verified.', 400);
export const userNotVerified = new AppError('user Not Verified', 403);
export const invalidEmail = new AppError('invalid Email', 401);
export const invalidOrExpiredOTP = new AppError('invalid Or Expired OTP', 403);
export const invalidCredentials = new AppError('invalid Credentials', 401);
export const invalidGoogleToken = new AppError('invalid Google Token', 403);