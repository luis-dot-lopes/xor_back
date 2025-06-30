import db from '../models/index.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const user = await db.User.create(req.body);
  res.status(201).json(user);
};

export const login = async (req, res) => {
  const { email } = req.body;
  const user = await db.User.findOne({ where: { email } });

  if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};
