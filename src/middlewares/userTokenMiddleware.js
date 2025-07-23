import db from '../models/index.js';

export async function userTokenMiddleware(req, res, next) {
  const token = req.params.token || req.query.token;
  if (!token) return res.status(401).json({ message: 'Token de acesso não fornecido' });

  const loan = await db.Loan.findOne({ where: { privateToken: token } });

  if (!loan) return res.status(403).json({ message: 'Token inválido ou expirado' });

  req.userIdFromToken = loan.userId;
  req.privateToken = token;
  next();
}
