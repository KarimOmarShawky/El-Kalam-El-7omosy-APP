import {Router} from "express";
import userRoutes from './app/user/routes.js';
import authRoutes from './app/auth/routes.js';
import messageRoutes from './app/message/routes.js';
import requestRoutes from './app/request/routes.js';
import conversationRoutes from './app/conversation/routes.js';
const router = Router();
router.use('/user', userRoutes);
router.use('/auth',authRoutes);
router.use('/message' , messageRoutes);
router.use('/request' , requestRoutes);
router.use('/conversation', conversationRoutes);

export default router;
// api/v1/auth/register