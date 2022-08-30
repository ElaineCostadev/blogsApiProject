/**
* @param {import('sequelize').Sequelize } Sequelize
* @param {import('sequelize').DataTypes} DataTypes
* @returns
*/

const Category = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: { type: DataTypes.STRING, allowNull: false },
  }, {
    timestamps: false,
    tableName: 'Categories',
    underscored: true,
  });
  return category;
}

module.exports = Category;
