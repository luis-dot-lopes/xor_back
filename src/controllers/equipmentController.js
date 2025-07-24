import * as equipmentService from "../services/equipmentService.js";
import { z } from "zod";
import { equipmentSchema } from "../validations/equipmentValidation.js";

export const create = async (req, res) => {
  try {
    const parsed = equipmentSchema.parse(req.body);
    const imageName = `${req.file.filename}`;

    const equipment = await equipmentService.createEquipment({
      ...parsed,
      imagem: imageName,
      admId: req.userId,
    });

    res.status(201).json(equipment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((err) => err.message);
      return res.status(400).json({ errors: messages });
    }
    console.error(error);
    res.status(500).json({ message: "Erro ao criar equipamento" });
  }
};

export const findAll = async (req, res) => {
  const equipments = await equipmentService.getAllEquipmentsByAdmId(req.userId);
  res.json(equipments);
};

export const findById = async (req, res) => {
  const equipment = await equipmentService.getEquipmentById(
    req.params.id,
    req.userId
  );
  if (!equipment)
    return res.status(404).json({ message: "Equipamento não encontrado" });
  res.json(equipment);
};

export const update = async (req, res) => {
  try {
    const parsed = equipmentSchema.parse(req.body);

    const imageName = req.file ? req.file.filename : null;

    const dataToUpdate = {
      ...parsed,
    };

    if (imageName) {
      dataToUpdate.imagem = imageName;
    }

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
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((err) => err.message);
      return res.status(400).json({ errors: messages });
    }

    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar equipamento" });
  }
};

export const remove = async (req, res) => {
  const deleted = await equipmentService.deleteEquipment(
    req.params.id,
    req.userId
  );
  if (!deleted)
    return res
      .status(404)
      .json({ message: "Equipamento não encontrado ou sem permissão" });

  res.status(204).send();
};
