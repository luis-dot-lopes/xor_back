import { v4 as uuidv4 } from "uuid";

export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    nome: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    telefone: DataTypes.STRING,
    endereco: DataTypes.STRING,
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { len: [11, 14] },
    },
    privateToken: {
      type: DataTypes.STRING,
      defaultValue: () => uuidv4(),
      unique: true,
    },
    logradouro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    cep: DataTypes.STRING,
    numero: DataTypes.STRING,
  });

  return User;
};
