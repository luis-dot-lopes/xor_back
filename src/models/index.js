import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

import UserModel from './user.js';
import EquipmentModel from './equipment.js';
import LoanModel from './loan.js';

const models = {};

models.User = UserModel(sequelize, DataTypes);
models.Equipment = EquipmentModel(sequelize, DataTypes);
models.Loan = LoanModel(sequelize, DataTypes);

// Associações
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;