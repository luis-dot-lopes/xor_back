export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      nome: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      telefone: DataTypes.STRING,
      endereco: DataTypes.STRING,
      logradouro: DataTypes.STRING,
      cidade: DataTypes.STRING,
      estado: DataTypes.STRING,
      cep: DataTypes.STRING,
      numero: DataTypes.STRING
    });
  
    User.associate = (models) => {
      User.hasMany(models.Loan, { foreignKey: 'userId', as: 'emprestimos' });
    };
  
    return User;
  };