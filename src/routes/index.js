import { Router } from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import equipmentRoutes from './equipmentRoutes.js';
import loanRoutes from './loanRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/equipments', equipmentRoutes);
router.use('/loans', loanRoutes);

export default router;
