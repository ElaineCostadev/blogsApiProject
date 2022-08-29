const { Category } = require('../../database/models');

const categoriesService = {
  create: async (name) => {
    const result = await Category.create({ name });
    return result;
  },
};

module.exports = categoriesService;
