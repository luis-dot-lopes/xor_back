// src/routes/grade.routes.js
import { Router } from 'express';
import * as GradeController from '../controllers/grade.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, GradeController.createGrade);
router.get('/', authMiddleware, GradeController.findAllGrades);
router.get('/:id', authMiddleware, GradeController.findGradeById);
router.put('/:id', authMiddleware, GradeController.updateGrade);
router.delete('/:id', authMiddleware, GradeController.deleteGrade);

export default router;