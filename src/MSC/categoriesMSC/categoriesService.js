const { Category } = require('../../database/models');

const categoriesService = {
  getAll: async () => Category.findAll(),

  create: async (name) => {
    const result = await Category.create({ name });
    return result;
  },
};

module.exports = categoriesService;
