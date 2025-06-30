import db from '../models/index.js';

export const createUser = async (data) => {
  return await db.User.create(data);
};

export const getAllUsers = async () => {
  return await db.User.findAll();
};

export const getUserById = async (id) => {
  return await db.User.findByPk(id);
};

export const updateUser = async (id, data) => {
  const user = await getUserById(id);
  if (!user) return null;
  return await user.update(data);
};

export const deleteUser = async (id) => {
  const user = await getUserById(id);
  if (!user) return null;
  return await user.destroy();
};
