// src/routes/user.routes.js
import { Router } from 'express';
import { authenticateUser, getAuthenticationTest } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', authenticateUser);
router.get('/test', authMiddleware, getAuthenticationTest);

export default router;