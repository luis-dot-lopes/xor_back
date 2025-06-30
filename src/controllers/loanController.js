import * as loanService from '../services/loanService.js';

export const create = async (req, res) => {
  const { userId, equipmentId } = req.body;
  const loan = await loanService.createLoan(userId, equipmentId);
  res.status(201).json(loan);
};

export const returnLoan = async (req, res) => {
  const updated = await loanService.returnLoan(req.params.id);
  if (!updated) return res.status(404).json({ message: 'Empréstimo não encontrado' });
  res.json(updated);
};

export const findAll = async (req, res) => {
  const loans = await loanService.getAllLoans();
  res.json(loans);
};

export const findById = async (req, res) => {
  const loan = await loanService.getLoanById(req.params.id);
  if (!loan) return res.status(404).json({ message: 'Empréstimo não encontrado' });
  res.json(loan);
};
