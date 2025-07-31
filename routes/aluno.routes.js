// src/routes/aluno.routes.js
import { Router } from 'express';
import { registrarAluno, listarAlunos, getAluno, deletarAluno, atualizarAluno } from '../controllers/aluno.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, listarAlunos);
router.post('/', registrarAluno);
router.get('/:id', authMiddleware, getAluno);
router.delete('/:id', authMiddleware, deletarAluno);
router.put('/', authMiddleware, atualizarAluno);

export default router;