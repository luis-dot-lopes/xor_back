import * as equipmentService from '../services/equipmentService.js';

export const create = async (req, res) => {
  const equipment = await equipmentService.createEquipment(req.body);
  res.status(201).json(equipment);
};

export const findAll = async (req, res) => {
  const equipments = await equipmentService.getAllEquipments();
  res.json(equipments);
};

export const findById = async (req, res) => {
  const equipment = await equipmentService.getEquipmentById(req.params.id);
  if (!equipment) return res.status(404).json({ message: 'Equipamento não encontrado' });
  res.json(equipment);
};

export const update = async (req, res) => {
  const updated = await equipmentService.updateEquipment(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Equipamento não encontrado' });
  res.json(updated);
};

export const remove = async (req, res) => {
  const deleted = await equipmentService.deleteEquipment(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Equipamento não encontrado' });
  res.status(204).send();
};
