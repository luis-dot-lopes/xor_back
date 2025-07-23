import db from "../models/index.js";

export const createEquipment = async (data) => {
  return await db.Equipment.create(data);
};

export const getAllEquipmentsByAdmId = async (admId) => {
  return await db.Equipment.findAll({
    where: { admId },
  });
};

export const getEquipmentById = async (id, admId) => {
  return await db.Equipment.findOne({
    where: {
      id,
      admId,
    },
  });
};

export const updateEquipment = async (id, admId, data) => {
  const equipment = await getEquipmentById(id, admId);
  if (!equipment) return null;
  return await equipment.update(data);
};

export const deleteEquipment = async (id, admId) => {
  const equipment = await getEquipmentById(id, admId);
  if (!equipment) return null;
  return await equipment.destroy();
};
