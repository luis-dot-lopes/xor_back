export default (sequelize, DataTypes) => {
    const Equipment = sequelize.define('Equipment', {
      nome: { type: DataTypes.STRING, allowNull: false },
      marca: { type: DataTypes.STRING, allowNull: false },
      modelo: { type: DataTypes.STRING, allowNull: false },
      categoria: { type: DataTypes.STRING, allowNull: false },
      imagem: {
      type: DataTypes.STRING, 
      allowNull: true
}
    });
  
    Equipment.associate = (models) => {
      Equipment.hasMany(models.Loan, { foreignKey: 'equipmentId', as: 'emprestimos' });
    };
  
    return Equipment;
  };