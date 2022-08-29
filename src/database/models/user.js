/**
* @param {import('sequelize').Sequelize } Sequelize
* @param {import('sequelize').DataTypes} DataTypes
* @returns
*/

const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true
    },
    password: DataTypes.STRING,
    image: DataTypes.STRING
  },
  {
    timestamps: false,
    tableName: 'Users',
    underscored: false,
});

user.associate = (models) => {
  user.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'BlogPosts' })
  // essa FK deve ser o nome que está no outro model ou o que está nesse? seria id?
  // passou no teste com as duas opções userId e id
  // esse as, deve ser minusculo?
}

  return user;
};

module.exports = User;

// poderia fazer a validação aqui, porem, a msg de erro está diferente do test.
// isEmail: { msg: '"email" must be a valid email' },