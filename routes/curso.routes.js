// src/routes/curso.routes.js
import { Router } from 'express';
import * as CursoController from '../controllers/curso.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, CursoController.createCurso);
router.get('/', authMiddleware, CursoController.findAllCursos);
router.get('/:id', authMiddleware, CursoController.findCursoById);
router.put('/:id', authMiddleware, CursoController.updateCurso);
router.delete('/:id', authMiddleware, CursoController.deleteCurso);

export default router;