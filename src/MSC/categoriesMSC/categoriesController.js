const categoriesService = require('./categoriesService');

const categoriesController = {
  getAll: async (req, res) => {
    const allCategories = await categoriesService.getAll();
    return res.status(200).json(allCategories);
  },

  create: async (req, res) => {
    const { name } = req.body;
    const category = await categoriesService.create(name);
    return res.status(201).json(category);
  },
};

module.exports = categoriesController;
