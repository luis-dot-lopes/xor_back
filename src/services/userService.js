import db from "../models/index.js";

export const createUser = async (data) => {
  return await db.User.create(data);
};

export const getAllUsersByAdmId = async (admId) => {
  return await db.User.findAll({
    where: { admId },
    order: [["id", "DESC"]],
    attributes: { exclude: ["privateToken", "admId"] },
  });
};

export const getUserById = async (id, admId) => {
  return await db.User.findOne({
    where: { id, admId },
    attributes: { exclude: ["privateToken", "admId"] },
  });
};

export const updateUser = async (id, admId, data) => {
  const user = await getUserById(id, admId);
  if (!user) return null;
  return await user.update(data);
};

export const deleteUser = async (id, admId) => {
  const user = await getUserById(id, admId);
  if (!user) return null;
  return await user.destroy();
};
