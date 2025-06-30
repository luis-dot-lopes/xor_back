import db from '../models/index.js';

export const createEquipment = async (data) => {
  return await db.Equipment.create(data);
};

export const getAllEquipments = async () => {
  return await db.Equipment.findAll();
};

export const getEquipmentById = async (id) => {
  return await db.Equipment.findByPk(id);
};

export const updateEquipment = async (id, data) => {
  const equipment = await getEquipmentById(id);
  if (!equipment) return null;
  return await equipment.update(data);
};

export const deleteEquipment = async (id) => {
  const equipment = await getEquipmentById(id);
  if (!equipment) return null;
  return await equipment.destroy();
};