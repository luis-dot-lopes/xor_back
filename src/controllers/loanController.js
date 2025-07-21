import * as loanService from '../services/loanService.js';
import { sendConfirmationEmail } from '../services/emailService.js';

export const create = async (req, res) => {
  const { userId, equipmentId } = req.body;

  try {
    const loan = await loanService.createLoan(userId, equipmentId);

    const { usuario: user, equipamento: equipment } = loan;

    await sendConfirmationEmail(
      user.email,
      "Confirmação de Empréstimo",
      `<h2>Comprovante de Empréstimo</h2><p>Equipamento: ${equipment.nome}</p>`
    );

    res.status(201).json(loan);
  } catch (error) {
    console.error("Erro ao criar empréstimo:", error);
    res.status(500).json({ message: 'Erro ao criar empréstimo' });
  }
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
