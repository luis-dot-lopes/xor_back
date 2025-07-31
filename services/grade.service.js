// src/services/grade.service.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createGrade(gradeDto) {
  return prisma.grade.create({
    data: gradeDto,
  });
}

export async function findAllGrades() {
  return prisma.grade.findMany();
}

export async function findGradeById(id) {
  return prisma.grade.findUnique({
    where: { id: BigInt(id) },
  });
}

export async function updateGrade(id, gradeDto) {
  return prisma.grade.update({
    where: { id: BigInt(id) },
    data: gradeDto,
  });
}

export async function deleteGrade(id) {
  return prisma.grade.delete({
    where: { id: BigInt(id) },
  });
}