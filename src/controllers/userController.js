import * as userService from "../services/userService.js";
import { userSchema } from "../validations/userValidation.js";
import { z } from "zod";

export const create = async (req, res) => {
  try {
    const parsed = userSchema.parse(req.body);

    const user = await userService.createUser({
      ...parsed,
      admId: req.userId,
    });

    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((i) => i.message);
      return res.status(400).json({ errors: messages });
    }
    console.error(error);
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
};

export const findAll = async (req, res) => {
  const users = await userService.getAllUsersByAdmId(req.userId);
  res.json(users);
};

export const findById = async (req, res) => {
  const user = await userService.getUserById(req.params.id, req.userId);
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json(user);
};

export const update = async (req, res) => {
  try {
    const parsed = userSchema.parse(req.body);

    const updated = await userService.updateUser(
      req.params.id,
      req.userId,
      parsed
    );

    if (!updated)
      return res
        .status(404)
        .json({ message: "Usuário não encontrado ou sem permissão" });

    res.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((i) => i.message);
      return res.status(400).json({ errors: messages });
    }
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
};

export const remove = async (req, res) => {
  const deleted = await userService.deleteUser(req.params.id, req.userId);
  if (!deleted)
    return res
      .status(404)
      .json({ message: "Usuário não encontrado ou sem permissão" });
  res.status(204).send();
};
