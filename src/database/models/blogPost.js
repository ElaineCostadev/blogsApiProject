/**
* @param {import('sequelize').Sequelize } Sequelize
* @param {import('sequelize').DataTypes} DataTypes
* @returns
*/

const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },

    title: { type: DataTypes.STRING, allowNull: false },

    content: { type: DataTypes.STRING, allowNull: false },

    userId: { type: DataTypes.STRING, foreignKey: true, allowNull: false, },

    published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW,  /* , defaultValue: sequelize.literal("CURRENT_TIMESTAMP") */},

    updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, /* ,  defaultValue: sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP") */},
  }, {
    timestamps: false,
    tableName: 'BlogPosts',
    underscored: false,
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    // esse as deve ser maiusculo ou minusculo? do que se refere?

  };

  return blogPost
}

module.exports = BlogPost;
