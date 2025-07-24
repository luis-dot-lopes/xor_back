import db from "../models/index.js";
import { sendConfirmationEmail } from "../services/emailService.js";

export const createLoan = async (req, res) => {
  try {
    const { userId, equipmentId } = req.body;

    const existingLoan = await db.Loan.findOne({
      where: {
        equipmentId,
        status: {
          [db.Sequelize.Op.not]: "Finalizado",
        },
      },
    });

    if (existingLoan) {
      return res.status(400).json({
        message:
          "Este equipamento já está emprestado e ainda não foi devolvido.",
      });
    }

    const loan = await db.Loan.create({
      userId,
      equipmentId,
      admId: req.userId,
    });

    const user = await db.User.findByPk(userId);

    if (user) {
      await sendConfirmationEmail(user.email, user.privateToken);
    }

    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllLoans = async (req, res) => {
  try {
    const loans = await db.Loan.findAll({
      attributes: ["status", "id"],
      include: [
        {
          association: "equipamento",
          attributes: ["nome", "id"],
        },
        {
          association: "usuario",
          attributes: ["nome", "email"],
        },
      ],
    });

    res.json(
      loans.map((loan) => ({
        id: loan.id,
        nomeEquipamento: loan.equipamento.nome,
        nomeUsuario: loan.usuario.nome,
        emailUsuario: loan.usuario.email,
      }))
    );
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

export const getUserLoansByToken = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await db.User.findOne({ where: { privateToken: token } });
    if (!user) {
      return res.status(404).json({ message: "Token inválido" });
    }

    const loans = await db.Loan.findAll({
      where: { userId: user.id },
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

    const user = await db.User.findOne({ where: { privateToken: token } });
    if (!user) {
      return res.status(404).json({ message: "Token inválido" });
    }

    const loan = await db.Loan.findOne({
      where: { id, userId: user.id },
      include: ["equipamento"],
    });

    if (!loan)
      return res.status(404).json({ message: "Empréstimo não encontrado" });

    res.json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
