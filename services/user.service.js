// src/services/user.service.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function authenticateUser(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { roles: true },
  });

  if (!user) {
    throw new Error('Email ou senha incorretos');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Email ou senha incorretos');
  }

  const roles = user.roles.map(role => role.name);
  const token = jwt.sign(
    { id: user.id, roles },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return token;
}