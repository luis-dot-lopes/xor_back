import { v4 as uuidv4 } from "uuid";

export default (sequelize, DataTypes) => {
  const Questao = sequelize.define("Questao", {
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
    idItemCorreto: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    dataCriacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  Questao.associate = (models) => {
    Questao.hasMany(models.Opcao, {
      foreignKey: "questaoId",
      as: "opcoes",
      onDelete: "CASCADE",
    });

    Questao.belongsTo(models.Opcao, {
      foreignKey: "idItemCorreto",
      as: "itemCorreto",
      constraints: false,
    });
  };

  return Questao;
};
