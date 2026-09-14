import {Router} from "express";
import userRoutes from './app/user/routes';
import authRoutes from './app/auth/routes';
import messageRoutes from './app/message/routes';
router.use('/user', userRoutes);
router.use('/auth',authRoutes);
router.use('/message' , messageRoutes);
export const router = Router();
