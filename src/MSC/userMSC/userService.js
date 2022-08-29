const { User } = require('../../database/models');
const CustomError = require('../../errors/CustomError');
const { generateToken } = require('../../helpers/jwtHelpers');

const userService = {
  create: async ({ displayName, email, password, image }) => {
    const checkIfEmailexists = await User.findOne({

      where: { email },
      attributes: ['email'],
      raw: false,
    });

    if (checkIfEmailexists) throw new CustomError('409', 'User already registered');
    
    const user = await User.create({ displayName, email, password, image });

    const token = generateToken(user.email);

    return token;
  },
};

module.exports = userService;
