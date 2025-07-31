// src/controllers/curso.controller.js
import * as CursoService from '../services/curso.service.js';

export async function createCurso(req, res) {
  try {
    const curso = await CursoService.createCurso(req.body);
    res.status(201).json(curso);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function findAllCursos(req, res) {
  try {
    const cursos = await CursoService.findAllCursos();
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cursos.' });
  }
}

export async function findCursoById(req, res) {
  try {
    const curso = await CursoService.findCursoById(req.params.id);
    if (!curso) {
      return res.status(404).json({ message: 'Curso não encontrado.' });
    }
    res.status(200).json(curso);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar curso.' });
  }
}

export async function updateCurso(req, res) {
  try {
    const curso = await CursoService.updateCurso(req.params.id, req.body);
    res.status(200).json(curso);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteCurso(req, res) {
  try {
    await CursoService.deleteCurso(req.params.id);
    res.status(204).send(); // 204 No Content para remoção bem-sucedida
  } catch (error) {
    res.status(404).json({ message: 'Curso não encontrado.' });
  }
}