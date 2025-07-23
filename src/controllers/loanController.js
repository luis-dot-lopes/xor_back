import db from "../models/index.js";
import { sendConfirmationEmail } from "../services/emailService.js";

export const createLoan = async (req, res) => {
  try {
    const { userId, equipmentId } = req.body;

    const loan = await db.Loan.create({
      userId,
      equipmentId,
      admId: req.admId,
    });

    const user = await db.User.findByPk(userId);
    if (user) {
      await sendConfirmationEmail(user.email, loan.privateToken);
    }

    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllLoans = async (req, res) => {
  try {
    const loans = await db.Loan.findAll({
      include: ["usuario", "equipamento", "administrador"],
    });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLoanById = async (req, res) => {
  try {
    const loan = await db.Loan.findByPk(req.params.id, {
      include: ["usuario", "equipamento", "administrador"],
    });

    if (!loan)
      return res.status(404).json({ message: "Empréstimo não encontrado" });

    res.json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLoanStatus = async (req, res) => {
  try {
    const { status, dataDevolucao } = req.body;
    const loan = await db.Loan.findByPk(req.params.id);

    if (!loan)
      return res.status(404).json({ message: "Empréstimo não encontrado" });

    if (status) loan.status = status;
    if (dataDevolucao) loan.dataDevolucao = dataDevolucao;

    await loan.save();
    res.json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteLoan = async (req, res) => {
  try {
    const loan = await db.Loan.findByPk(req.params.id);
    if (!loan)
      return res.status(404).json({ message: "Empréstimo não encontrado" });

    await loan.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ------------------- Acesso do usuário via privateToken -------------------

export const getUserLoansByToken = async (req, res) => {
  try {
    const loans = await db.Loan.findAll({
      where: { userId: req.userIdFromToken, privateToken: req.privateToken },
      include: ["equipamento"],
    });

    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserLoanById = async (req, res) => {
  try {
    const { id, token } = req.params;

    const loan = await db.Loan.findOne({
      where: { id, privateToken: token, userId: req.userIdFromToken },
      include: ["equipamento"],
    });

    if (!loan)
      return res.status(404).json({ message: "Empréstimo não encontrado" });

    res.json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
