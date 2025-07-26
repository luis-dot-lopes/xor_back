import * as userService from "../services/userService.js";
import { userSchema } from "../validations/userValidation.js";
import { handleError } from "../utils/errorHandler.js";

export const create = async (req, res) => {
  try {
    const parsed = userSchema.parse(req.body);
    const user = await userService.createUser({ ...parsed, admId: req.userId });
    res.status(201).json(user);
  } catch (error) {
    return handleError(res, error, "Erro ao criar usuário");
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
    return handleError(res, error, "Erro ao atualizar usuário");
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
export const getProfile = async (req, res) => {
  try {
    const admin = await db.Adm.findByPk(req.userId, {
      attributes: { exclude: ['senha'] }
    });

    if (!admin) {
      return res.status(404).json({ message: "Administrador não encontrado" });
    }

    res.json(admin);
  } catch (error) {
    return handleError(res, error, "Erro ao buscar informações do administrador");
  }
};