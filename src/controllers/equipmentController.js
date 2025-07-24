import * as equipmentService from "../services/equipmentService.js";
import { equipmentSchema } from "../validations/equipmentValidation.js";
import { handleError } from "../utils/errorHandler.js";

export const create = async (req, res) => {
  try {
    const parsed = equipmentSchema.parse(req.body);
    const imageName = req.file.filename;

    const equipment = await equipmentService.createEquipment({
      ...parsed,
      imagem: imageName,
      admId: req.userId,
    });

    res.status(201).json(equipment);
  } catch (error) {
    return handleError(res, error, "Erro ao criar equipamento");
  }
};

export const findAll = async (req, res) => {
  try {
    const equipments = await equipmentService.getAllEquipmentsByAdmId(req.userId);
    res.json(equipments);
  } catch (error) {
    return handleError(res, error, "Erro ao buscar equipamentos");
  }
};

export const findById = async (req, res) => {
  try {
    const equipment = await equipmentService.getEquipmentById(req.params.id, req.userId);
    if (!equipment)
      return res.status(404).json({ message: "Equipamento não encontrado" });

    res.json(equipment);
  } catch (error) {
    return handleError(res, error, "Erro ao buscar equipamento");
  }
};

export const update = async (req, res) => {
  try {
    const parsed = equipmentSchema.parse(req.body);
    const imageName = req.file?.filename || null;

    const dataToUpdate = { ...parsed };
    if (imageName) dataToUpdate.imagem = imageName;

    const updated = await equipmentService.updateEquipment(
      req.params.id,
      req.userId,
      dataToUpdate
    );

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Equipamento não encontrado ou sem permissão" });
    }

    res.json(updated);
  } catch (error) {
    return handleError(res, error, "Erro ao atualizar equipamento");
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await equipmentService.deleteEquipment(req.params.id, req.userId);
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Equipamento não encontrado ou sem permissão" });
    }
    res.status(204).send();
  } catch (error) {
    return handleError(res, error, "Erro ao remover equipamento");
  }
};
