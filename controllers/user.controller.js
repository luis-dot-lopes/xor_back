// src/controllers/user.controller.js
import { authenticateUser as userServiceAuthenticateUser } from '../services/user.service.js';

export async function authenticateUser(req, res) {
  try {
    const { email, password } = req.body;
    const token = await userServiceAuthenticateUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

export async function getAuthenticationTest(req, res) {
  res.status(200).json({ message: 'Autenticado com sucesso' });
}