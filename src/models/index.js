import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

import UserModel from "./user.js";
import QuestaoModel from "./questao.js";
import OpcaoModel from "./opcao.js";

const models = {};

models.User = UserModel(sequelize, DataTypes);
models.Questao = QuestaoModel(sequelize, DataTypes);
models.Opcao = OpcaoModel(sequelize, DataTypes);

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
