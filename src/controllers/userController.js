import * as userService from '../services/userService.js';

export const create = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};

export const findAll = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const findById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.json(user);
};

export const update = async (req, res) => {
  const updated = await userService.updateUser(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.json(updated);
};

export const remove = async (req, res) => {
  const deleted = await userService.deleteUser(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.status(204).send();
};
