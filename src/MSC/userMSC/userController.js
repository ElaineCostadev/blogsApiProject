const userService = require('./userService');

const userController = {
  getAll: async (_req, res) => {
    const result = await userService.getAll();
    return res.status(200).json(result);
  },

  getByPk: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await userService.getByPk(id);
      res.status(200).json(result);
    } catch (error) {
      return res.status(error.status)
      .json({ message: error.message });
    }
  },

  create: async (req, res) => {
    const { displayName, email, password, image } = req.body;
    try {
      const result = await userService.create({ displayName, email, password, image });
      return res.status(201).json({ token: result });
    } catch (error) {
      return res.status(error.status)
      .json({ message: error.message });
    }
  },
};

module.exports = userController;
