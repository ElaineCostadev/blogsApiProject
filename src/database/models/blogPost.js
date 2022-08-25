/**
* @param {import('sequelize').Sequelize } Sequelize
* @param {import('sequelize').DataTypes} DataTypes
* @returns
*/

const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true },

    title: DataTypes.STRING,

    content: DataTypes.STRING,

    userId: { type: DataTypes.STRING, foreignKey: true, allowNull: false, },

    published: { type: DataTypes.timestamps, allowNull: false, defaultValue: sequelize.literal("CURRENT_TIMESTAMP")},

    updated: { type: DataTypes.timestamps, allowNull: false, defaultValue: sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")},
  }, {
    timestamps: false,
    tableName: 'BlogPosts',
    underscored: true,
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'Users' });
    // esse as deve ser maiusculo ou minusculo? do que se refere?

  };

  return blogPost
}

module.exports = BlogPost;
