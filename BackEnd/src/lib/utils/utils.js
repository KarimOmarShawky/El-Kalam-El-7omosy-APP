import jwt from 'jsonwebtoken';
import { toMS } from '../../pkg/utils/time.js';
import {env} from "../config/env.js";

export const signToken = (user) => {
    return jwt.sign({
        id: user._id,
        email: user.email,
        name: user.name,
    }, env.jwt.jwtSecret, { expiresIn: toMS(1, 'day') });
};