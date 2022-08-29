const userService = require('./userService');

const userController = {
  create: async (req, res) => {
    const { displayName, email, password, image } = req.body;
    console.log(req.body, 'Controller');
    try {
      const result = await userService.create({ displayName, email, password, image });
      res.status(201).json({ token: result });
    } catch (error) {
      return res.status(error.status)
      .json({ message: error.message });
    }
  },
};

module.exports = userController;
