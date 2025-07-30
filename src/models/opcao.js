export default (sequelize, DataTypes) => {
  const Opcao = sequelize.define("Opcao", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    enunciado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCorreta: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Opcao.associate = (models) => {
    Opcao.belongsTo(models.Questao, {
      foreignKey: "questaoId",
      as: "questao",
    });
  };

  return Opcao;
};
