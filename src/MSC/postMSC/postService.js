const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const config = require('../../database/config/config');

const sequelize = new Sequelize(config.development);
const { BlogPost, User, PostCategory, Category } = require('../../database/models');
const CustomError = require('../../errors/CustomError');

// https://runebook.dev/pt/docs/sequelize/manual/eager-loading
const postService = {
  getAll: async () => {
    const allInfos = await BlogPost.findAll({
      include: { all: true, attributes: { exclude: ['password'] },
    },
  });

    return allInfos;
  },

  getByPk: async (id) => {
    const findInfo = await BlogPost.findByPk(id, {
      include: { all: true, attributes: { exclude: ['password'] } } });
      if (findInfo === null) throw new CustomError('404', 'Post does not exist');
    return findInfo;

/*     include: [{ model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }], */
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

  update: async ({ email, id, title, content }) => {
  // verificar se o usuario existe
  const findUser = await User.findOne({
    where: { email }, attributes: ['id', 'email'], raw: true,
  });

  // verificar o post a ser alterado com id.
  await BlogPost.update({ title, content }, { where: { userId: findUser.id, id } });

    const findbyPk = await BlogPost.findByPk(id, {
      include: { all: true, attributes: { exclude: ['password'] } } });
      if (findbyPk === null) throw new CustomError('404', 'Post does not exist');
      if (findbyPk.userId !== findUser.id) throw new CustomError('401', 'Unauthorized user');
    return findbyPk;
  },

  destroy: async ({ id, email }) => {
  // verifico se o usuario existe  
    const findUser = await User.findOne({
      where: { email }, attributes: ['id', 'email'], raw: true,
    });
    const findbyPk = await BlogPost.findByPk(id, {
      include: { all: true, attributes: { exclude: ['password'] } } });

      if (findbyPk === null) throw new CustomError('404', 'Post does not exist');
      if (findbyPk.userId !== findUser.id) throw new CustomError('401', 'Unauthorized user');

    await BlogPost.destroy({ where: { userId: findUser.id, id } });

    return null;
  },

  search: async (name) => {
    const resultSearch = await BlogPost.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.substring]: name } },
          { content: { [Op.substring]: name } }],
      },
      include: [{ model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      }],
      });
      return resultSearch;
    },
};

module.exports = postService;
