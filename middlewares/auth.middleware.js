// src/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRoles = decoded.roles;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
}

export default authMiddleware;