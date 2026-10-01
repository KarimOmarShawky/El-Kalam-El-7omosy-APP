import jwt from 'jsonwebtoken';
import { toMS } from './time.js';

export const signToken = (user) => {
    return jwt.sign({
        id: user._id,
        email: user.email,
        name: user.name,
    }, process.env.JWT_SECRET, { expiresIn: toMS(1, 'day') });
};