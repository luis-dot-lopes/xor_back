// src/controllers/disciplina.controller.js
import * as DisciplinaService from '../services/disciplina.service.js';

export async function createDisciplina(req, res) {
  try {
    const disciplina = await DisciplinaService.createDisciplina(req.body);
    res.status(201).json(disciplina);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function findAllDisciplinas(req, res) {
  try {
    const disciplinas = await DisciplinaService.findAllDisciplinas();
    res.status(200).json(disciplinas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar disciplinas.' });
  }
}

export async function findDisciplinaById(req, res) {
  try {
    const disciplina = await DisciplinaService.findDisciplinaById(req.params.id);
    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada.' });
    }
    res.status(200).json(disciplina);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar disciplina.' });
  }
}

export async function updateDisciplina(req, res) {
  try {
    const disciplina = await DisciplinaService.updateDisciplina(req.params.id, req.body);
    res.status(200).json(disciplina);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteDisciplina(req, res) {
  try {
    await DisciplinaService.deleteDisciplina(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: 'Disciplina não encontrada.' });
  }
}