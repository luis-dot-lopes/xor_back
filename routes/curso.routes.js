// src/routes/curso.routes.js
import { Router } from 'express';
import * as CursoController from '../controllers/curso.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', CursoController.createCurso);
router.get('/', CursoController.findAllCursos);
router.get('/:id', CursoController.findCursoById);
router.put('/:id', CursoController.updateCurso);
router.delete('/:id', CursoController.deleteCurso);

export default router;