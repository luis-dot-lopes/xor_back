export default (sequelize, DataTypes) => {
  const Adm = sequelize.define("adm", {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [11, 14],
      },
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Adm.associate = (models) => {
    Adm.hasMany(models.Equipment, {
      foreignKey: "admId",
      as: "equipamentos",
    });

    Adm.hasMany(models.User, {
      foreignKey: "admId",
      as: "usuarios",
    });
  };

  return Adm;
};
