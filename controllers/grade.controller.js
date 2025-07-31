// src/controllers/grade.controller.js
import * as GradeService from '../services/grade.service.js';

export async function createGrade(req, res) {
  try {
    const grade = await GradeService.createGrade(req.body);
    res.status(201).json(grade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function findAllGrades(req, res) {
  try {
    const grades = await GradeService.findAllGrades();
    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar grades.' });
  }
}

export async function findGradeById(req, res) {
  try {
    const grade = await GradeService.findGradeById(req.params.id);
    if (!grade) {
      return res.status(404).json({ message: 'Grade não encontrada.' });
    }
    res.status(200).json(grade);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar grade.' });
  }
}

export async function updateGrade(req, res) {
  try {
    const grade = await GradeService.updateGrade(req.params.id, req.body);
    res.status(200).json(grade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteGrade(req, res) {
  try {
    await GradeService.deleteGrade(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: 'Grade não encontrada.' });
  }
}