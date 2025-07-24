import db from "../models/index.js";

export async function userTokenMiddleware(req, res, next) {
  const token = req.params.token || req.query.token;
  if (!token)
    return res.status(401).json({ message: "Token de acesso não fornecido" });

  const user = await db.User.findOne({ where: { privateToken: token } });

  if (!user)
    return res.status(403).json({ message: "Token inválido ou expirado" });

  req.userIdFromToken = user.id;
  req.privateToken = token;
  next();
}
