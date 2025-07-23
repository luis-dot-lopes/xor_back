import db from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { z } from "zod";

import { registerSchema } from "../validations/registerValidation.js";

export const register = async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);

    const emailExists = await db.Adm.findOne({
      where: { email: data.email },
    });

    if (emailExists) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const cpfExists = await db.Adm.findOne({ where: { cpf: data.cpf } });

    if (cpfExists) {
      return res.status(400).json({ message: "CPF já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(data.senha, 10);

    const user = await db.Adm.create({
      nome: data.nome,
      email: data.email,
      senha: hashedPassword,
      cpf: data.cpf,
      telefone: data.telefone,
    });

    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((err) => err.message);
      return res.status(400).json({ errors: messages });
    }

    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const login = async (req, res) => {
  const { email, senha } = req.body;

  const user = await db.Adm.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: "Credenciais inválidas" });

  const senhaCorreta = await bcrypt.compare(senha, user.senha);

  if (!senhaCorreta) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
};
