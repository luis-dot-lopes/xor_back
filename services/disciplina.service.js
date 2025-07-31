// src/services/disciplina.service.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createDisciplina(disciplinaDto) {
  return prisma.disciplina.create({
    data: disciplinaDto,
  });
}

export async function findAllDisciplinas() {
  return prisma.disciplina.findMany();
}

export async function findDisciplinaById(id) {
  return prisma.disciplina.findUnique({
    where: { id: BigInt(id) },
  });
}

export async function updateDisciplina(id, disciplinaDto) {
  return prisma.disciplina.update({
    where: { id: BigInt(id) },
    data: disciplinaDto,
  });
}

export async function deleteDisciplina(id) {
  return prisma.disciplina.delete({
    where: { id: BigInt(id) },
  });
}