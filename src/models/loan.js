import { v4 as uuidv4 } from 'uuid';

export default (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    dataEmprestimo: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.ENUM("Em andamento", "Finalizado"),
      defaultValue: "Em andamento"
    },
    dataDevolucao: {
      type: DataTypes.DATE,
      allowNull: true
    },
    privateToken: {
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    equipmentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Loan.associate = (models) => {
    Loan.belongsTo(models.User, { foreignKey: 'userId', as: 'usuario' });
    Loan.belongsTo(models.Equipment, { foreignKey: 'equipmentId', as: 'equipamento' });
  };

  return Loan;
};
