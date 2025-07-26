export const getProfile = async (req, res) => {
  try {
    const admin = await db.Adm.findByPk(req.userId, {
      attributes: { exclude: ["senha"] },
    });

    if (!admin) {
      return res.status(404).json({ message: "Administrador não encontrado" });
    }

    res.json(admin);
  } catch (error) {
    return handleError(
      res,
      error,
      "Erro ao buscar informações do administrador"
    );
  }
};
