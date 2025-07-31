// src/routes/grade.routes.js
import { Router } from 'express';
import * as GradeController from '../controllers/grade.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', GradeController.createGrade);
router.get('/', GradeController.findAllGrades);
router.get('/:id', GradeController.findGradeById);
router.put('/:id', GradeController.updateGrade);
router.delete('/:id', GradeController.deleteGrade);

export default router;