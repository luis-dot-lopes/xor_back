// src/services/aluno.service.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

export async function createAlunoAndUser(alunoDto) {
  try {
    const {
      nome, email, senha, avatarUrl, nivel, cursoId, gradeId, semestreAtual,
      matricula, cadeirasRealizadas, cadeirasAtivas,
    } = alunoDto;

    const hashedPassword = await bcrypt.hash(senha, SALT_ROUNDS);

    const userRole = await prisma.role.findUnique({
      where: { name: 'ROLE_USER' },
    });
    if (!userRole) {
      throw new Error('ROLE_USER não encontrada.');
    }

    const newAluno = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          nome,
          email,
          password: hashedPassword,
          roles: {
            connect: { id: userRole.id },
          },
        },
      });

      const historicoDisciplinasData = cadeirasRealizadas?.map((c) => ({
        nota: c.nota,
        status: 'CONCLUIDA',
        disciplina: { connect: { id: c.id } },
      }));

      const cadeirasAtivasData = cadeirasAtivas?.map((cId) => ({
        id: cId,
      }));

      const aluno = await tx.aluno.create({
        data: {
          user: { connect: { id: user.id } },
          matricula,
          avatarUrl,
          nivel,
          curso: { connect: { id: cursoId } },
          gradeAtual: { connect: { id: gradeId } },
          semestreAtual,
          dataCadastro: new Date(),
          historicoDisciplinas: {
            create: historicoDisciplinasData,
          },
          cadeirasAtivas: {
            connect: cadeirasAtivasData,
          },
        },
        include: {
          historicoDisciplinas: true,
          cadeirasAtivas: true,
        },
      });

      return aluno;
    });

    return newAluno;
  } catch (error) {
    console.error('Erro ao criar aluno e usuário:', error);
    throw error;
  }
}