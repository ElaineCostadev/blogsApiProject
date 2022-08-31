const loginService = require('./loginService');

const loginController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await loginService.login(email, password);
      res.status(200).json({ token: result });
    } catch (error) {
      return res.status(error.status)
      .json({ message: error.message });
    }
  },
};

module.exports = loginController;