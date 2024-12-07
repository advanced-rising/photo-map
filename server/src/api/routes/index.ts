import { Router } from 'express';
import authRoutes from './auth';

const router = Router();

// Auth routes
router.use('/auth', authRoutes);

// 다른 라우트들도 여기에 추가 가능
// router.use('/users', userRoutes);
// router.use('/posts', postRoutes);

export default router;
