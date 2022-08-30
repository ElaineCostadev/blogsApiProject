/**
* @param {import('sequelize').Sequelize } Sequelize
* @param {import('sequelize').DataTypes} DataTypes
* @returns
*/

const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    displayName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: false,
    tableName: 'Users',
    underscored: false,
});

user.associate = (models) => {
  user.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'user' })
  // essa FK deve ser o nome que está no outro model ou o que está nesse? seria id?
  // passou no teste com as duas opções userId e id
  // esse as, deve ser minusculo?
}

  return user;
};

module.exports = User;

// poderia fazer a validação aqui, porem, a msg de erro está diferente do test.
// isEmail: { msg: '"email" must be a valid email' },