import db from "../models/index.js";
import { handleError } from "../utils/errorHandler.js";
import { sendConfirmationEmail } from "../services/emailService.js";

const verificarAutorizacaoAdm = (loan, userId) => loan.admId === userId;

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
    return handleError(res, error, "Erro ao criar empréstimo");
  }
};

export const getAllLoans = async (req, res) => {
  try {
    const loans = await db.Loan.findAll({
      where: { admId: req.userId },
      attributes: ["status", "id"],
      order: [["id", "DESC"]],
      include: [
        { association: "equipamento", attributes: ["nome", "id"] },
        { association: "usuario", attributes: ["nome", "email"] },
      ],
    });

    res.json(
      loans.map((loan) => ({
        id: loan.id,
        status: loan.status,
        nomeEquipamento: loan.equipamento.nome,
        nomeUsuario: loan.usuario.nome,
        emailUsuario: loan.usuario.email,
      }))
    );
  } catch (error) {
    return handleError(res, error, "Erro ao buscar empréstimos");
  }
};

export const getLoanById = async (req, res) => {
  try {
    const loan = await db.Loan.findByPk(req.params.id, {
      attributes: ["status", "id", "admId"],
      include: [
        { association: "equipamento", attributes: ["nome", "id"] },
        { association: "usuario", attributes: ["nome", "email", "cpf"] },
      ],
    });

    if (!loan)
      return res.status(404).json({ message: "Empréstimo não encontrado" });

    if (!verificarAutorizacaoAdm(loan, req.userId))
      return res.status(403).json({ message: "Acesso negado" });

    return res.json({
      id: loan.id,
      status: loan.status,
      cpfUsuario: loan.usuario.cpf,
      nomeEquipamento: loan.equipamento.nome,
      nomeUsuario: loan.usuario.nome,
      emailUsuario: loan.usuario.email,
    });
  } catch (error) {
    return handleError(res, error, "Erro ao buscar empréstimo");
  }
};

export const updateLoanStatus = async (req, res) => {
  try {
    const loan = await db.Loan.findByPk(req.params.id);

    if (!loan)
      return res.status(404).json({ message: "Empréstimo não encontrado" });

    if (!verificarAutorizacaoAdm(loan, req.userId))
      return res.status(403).json({ message: "Acesso negado" });

    loan.status = "Finalizado";
    await loan.save();

    res.json({ message: "Status atualizado para Finalizado", loan });
  } catch (error) {
    return handleError(res, error, "Erro ao atualizar status");
  }
};

export const deleteLoan = async (req, res) => {
  try {
    const loan = await db.Loan.findByPk(req.params.id);

    if (!loan)
      return res.status(404).json({ message: "Empréstimo não encontrado" });

    if (!verificarAutorizacaoAdm(loan, req.userId))
      return res.status(403).json({ message: "Acesso negado" });

    await loan.destroy();
    res.status(204).end();
  } catch (error) {
    return handleError(res, error, "Erro ao remover empréstimo");
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
      attributes: ["status", "id"],
      order: [["id", "DESC"]],
      include: [
        { association: "equipamento", attributes: ["nome", "id"] },
        { association: "usuario", attributes: ["nome", "email"] },
      ],
    });

    res.json(
      loans.map((loan) => ({
        id: loan.id,
        status: loan.status,
        nomeEquipamento: loan.equipamento.nome,
        nomeUsuario: loan.usuario.nome,
        emailUsuario: loan.usuario.email,
      }))
    );
  } catch (error) {
    return handleError(res, error, "Erro ao buscar empréstimos do usuário");
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
      attributes: ["status", "id", "admId"],
      include: [
        { association: "equipamento", attributes: ["nome", "id"] },
        { association: "usuario", attributes: ["nome", "email", "cpf"] },
      ],
    });

    if (!loan)
      return res.status(404).json({ message: "Empréstimo não encontrado" });

    return res.json({
      id: loan.id,
      status: loan.status,
      cpfUsuario: loan.usuario.cpf,
      nomeEquipamento: loan.equipamento.nome,
      nomeUsuario: loan.usuario.nome,
      emailUsuario: loan.usuario.email,
    });
  } catch (error) {
    return handleError(res, error, "Erro ao buscar empréstimo do usuário");
  }
};
