// src/services/curso.service.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createCurso(cursoDto) {
  return prisma.curso.create({
    data: cursoDto,
  });
}

export async function findAllCursos() {
  return prisma.curso.findMany();
}

export async function findCursoById(id) {
  return prisma.curso.findUnique({
    where: { id: BigInt(id) },
  });
}

export async function updateCurso(id, cursoDto) {
  return prisma.curso.update({
    where: { id: BigInt(id) },
    data: cursoDto,
  });
}

export async function deleteCurso(id) {
  return prisma.curso.delete({
    where: { id: BigInt(id) },
  });
}