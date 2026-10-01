import {z} from 'zod';

export const registerSchema = z.object({
    name: z.string().min(1).trim(),
    email: z.email().lowercase().trim(),
    password: z.string().min(6).max(20).trim(),
    provider: z.enum(['local', 'google']).default('local'),
    dob: z.date().optional(),
    gender: z.enum(['male', 'female']).optional(),
});

export const loginSchema = z.object({
    email: z.email().lowercase().trim(),
    password: z.string().min(6).max(20).trim(),
});

export const resetPasswordSchema = z.object({
    email: z.email().lowercase().trim(),
    code: z.string().length(6).trim(),
    newPassword: z.string().min(6).max(20).trim(),
});

export const sendOtpSchema = z.object({
    email: z.email().lowercase().trim(),
});

export const loginWithGoogleSchema = z.object({
    idToken: z.string().min(1).trim(),
});
