const { User } = require('../../database/models');
const CustomError = require('../../errors/CustomError');
const { generateToken } = require('../../helpers/jwtHelpers');

const loginService = {
  login: async (email, password) => {
    const user = await User.findOne({
      where: { email },
      logging: console.log,
      attributes: ['email', 'password'],
      raw: true,
    });
      console.log(user);
      if (!user || user.password !== password) throw new CustomError('400', 'Invalid fields');
    const token = generateToken(user.email);

    return token;
  },
};

module.exports = loginService;
