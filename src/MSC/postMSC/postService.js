const Sequelize = require('sequelize');
const config = require('../../database/config/config');

const sequelize = new Sequelize(config.development);
const { BlogPost } = require('../../database/models');
const { User } = require('../../database/models');
const { PostCategory } = require('../../database/models');

// https://runebook.dev/pt/docs/sequelize/manual/eager-loading
const postService = {
  getAll: async () => {
    const allInfos = await BlogPost.findAll({
      include: { all: true, attributes: { exclude: ['password'] } },
    });

    return allInfos;
  },

  create: async ({ title, content, categoryIds, email }) => {
    const findUser = await User.findOne({
      where: { email }, attributes: ['id'], raw: true,
    });
  
    const resultTransaction = await sequelize.transaction(async (transaction) => {
      const blogPost = await BlogPost.create({
        title, content, userId: findUser.id }, { transaction });

      const mapOfCategoriesAndPost = categoryIds.map((eachCategory) => ({
        postId: blogPost.id, categoryId: eachCategory }));

      await PostCategory.bulkCreate(mapOfCategoriesAndPost, { transaction });
    
      return blogPost;
      // return { ...blogPost.dataValues, categories };
    });

    return resultTransaction;
  },
};

module.exports = postService;

// não consegui fazer a checagem no BD pelo Service

/* const checkCategories = await Category.findAndCountAll({
  where: { id: categoryIds },
});
if (!checkCategories) throw new CustomError('400', '"categoryIds" not found"'); */