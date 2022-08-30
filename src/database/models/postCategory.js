/**
* @param {import('sequelize').Sequelize } Sequelize
* @param {import('sequelize').DataTypes} DataTypes
* @returns
*/

const PostCategory = (sequelize, DataTypes) => {

  const postCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
  },
  { timestamps: false,
    underscored: false,
    tableName: 'PostCategories',
  },
  );

  postCategory.associate = (models) => {

    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: 'PostCategory',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    })
  
    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPosts', 
      through: 'PostCategory',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    })

  }
  return postCategory;
};

module.exports = PostCategory;
