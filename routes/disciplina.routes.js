// src/routes/disciplina.routes.js
import { Router } from 'express';
import * as DisciplinaController from '../controllers/disciplina.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', DisciplinaController.createDisciplina);
router.get('/', DisciplinaController.findAllDisciplinas);
router.get('/:id', DisciplinaController.findDisciplinaById);
router.put('/:id', DisciplinaController.updateDisciplina);
router.delete('/:id', DisciplinaController.deleteDisciplina);

export default router;