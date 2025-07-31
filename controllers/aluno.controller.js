// src/controllers/aluno.controller.js
import { createAlunoAndUser } from '../services/aluno.service.js';

export async function registrarAluno(req, res) {
  try {
    const alunoDto = req.body;
    const novoAluno = await createAlunoAndUser(alunoDto);
    res.status(201).json(novoAluno);
  } catch (error) {
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return res.status(409).json({ message: 'Email já cadastrado.' });
    }
    res.status(400).json({ message: error.message });
  }
}

export async function listarAlunos(req, res) {
  res.status(501).json({ message: 'Endpoint não implementado' });
}

export async function getAluno(req, res) {
  res.status(501).json({ message: 'Endpoint não implementado' });
}

export async function deletarAluno(req, res) {
  res.status(501).json({ message: 'Endpoint não implementado' });
}

export async function atualizarAluno(req, res) {
  res.status(501).json({ message: 'Endpoint não implementado' });
}