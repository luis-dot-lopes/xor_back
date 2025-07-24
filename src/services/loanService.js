import db from "../models/index.js";

export const createLoan = async ({ userId, equipmentId }, admId) => {
  const user = await db.User.findOne({ where: { id: userId, admId } });
  if (!user) throw new Error("Usuário não pertence ao administrador");

  const equipment = await db.Equipment.findOne({
    where: { id: equipmentId, admId },
  });
  if (!equipment) throw new Error("Equipamento não pertence ao administrador");

  return await db.Loan.create(
    { userId, equipmentId, admId },
    {
      include: [
        { model: db.User, as: "usuario" },
        { model: db.Equipment, as: "equipamento" },
      ],
    }
  );
};

export const getLoansByAdmId = async (admId) => {
  return await db.Loan.findAll({
    where: { admId },
    include: [
      { model: db.User, as: "usuario" },
      { model: db.Equipment, as: "equipamento" },
    ],
    order: [["id", "ASC"]],
  });
};

export const getLoansByUserId = async (userId) => {
  return await db.Loan.findAll({
    where: { userId },
    include: [
      { model: db.User, as: "usuario" },
      { model: db.Equipment, as: "equipamento" },
    ],
    order: [["id", "ASC"]],
  });
};

export const getLoanByIdAndAdmId = async (id, admId) => {
  return await db.Loan.findOne({
    where: { id, admId },
    include: [
      { model: db.User, as: "usuario" },
      { model: db.Equipment, as: "equipamento" },
    ],
  });
};

export const getLoanByIdAndUserId = async (id, userId) => {
  return await db.Loan.findOne({
    where: { id, userId },
    include: [
      { model: db.User, as: "usuario" },
      { model: db.Equipment, as: "equipamento" },
    ],
  });
};
