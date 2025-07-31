// src/routes/disciplina.routes.js
import { Router } from 'express';
import * as DisciplinaController from '../controllers/disciplina.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, DisciplinaController.createDisciplina);
router.get('/', authMiddleware, DisciplinaController.findAllDisciplinas);
router.get('/:id', authMiddleware, DisciplinaController.findDisciplinaById);
router.put('/:id', authMiddleware, DisciplinaController.updateDisciplina);
router.delete('/:id', authMiddleware, DisciplinaController.deleteDisciplina);

export default router;