import { Router, Request, Response } from 'express';
import { googleLogin, googleCallback, getAuthStatus, logout } from '../controllers/authController';

const router = Router();

router.get('/google', googleLogin as (req: Request, res: Response) => void);
router.get('/google/callback', googleCallback as (req: Request, res: Response) => void);
router.get('/status', getAuthStatus as (req: Request, res: Response) => void);
router.post('/logout', logout as (req: Request, res: Response) => void);

export default router;
