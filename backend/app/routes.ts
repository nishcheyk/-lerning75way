import { Router } from 'express';
import userRoutes from './user/user.routes';

const router = Router();

router.use('/auth', userRoutes);

export default router;
