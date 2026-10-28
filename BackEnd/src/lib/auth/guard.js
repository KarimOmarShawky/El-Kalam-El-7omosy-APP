import { env } from "../config/env.js";
import { AppError } from "../error/error.js";
import jwt from "jsonwebtoken"
export function guard(req, res, next) {
    try {
        const token = req.cookies?.access_token;
        if (!token) throw new AppError('no token provided', 401);
        req.user = jwt.verify(token, env.jwt.jwtSecret);

        next();
    }
    catch(error){
        next(error);

    }
}
export function optionalGuard(req, res, next) {
    try {
        const token = req.cookies?.access_token;
        if (token) {
            req.user = jwt.verify(token, env.jwt.jwtSecret);
        }
        next();
    } catch (error) {
        next(error);
    }
}