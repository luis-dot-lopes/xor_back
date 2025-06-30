export default (sequelize, DataTypes) => {
    const Loan = sequelize.define('Loan', {
      dataEmprestimo: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      dataDevolucao: {
        type: DataTypes.DATE,
        allowNull: true 
      }
    });
  
    Loan.associate = (models) => {
      Loan.belongsTo(models.User, { foreignKey: 'userId', as: 'usuario' });
      Loan.belongsTo(models.Equipment, { foreignKey: 'equipmentId', as: 'equipamento' });
    };
  
    return Loan;
  };