const { User } = require('../../database/models');
const CustomError = require('../../errors/CustomError');
const { generateToken } = require('../../helpers/jwtHelpers');

const userService = {
  getAll: async () => {
    const allUsers = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    return allUsers;
  },

  getByPk: async (id) => {
    const findUser = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
      // logging: console.log,
      raw: false,
    });
    if (!findUser) throw new CustomError('404', 'User does not exist');
    return findUser;
  },

  create: async ({ displayName, email, password, image }) => {
    const checkIfEmailexists = await User.findOne({
      where: { email },
      attributes: ['email'],
    });

    if (checkIfEmailexists) {
      throw new CustomError('409', 'User already registered');
    } 
    await User.create({ displayName, email, password, image });
    const token = generateToken({ email });

    return token;
  },

  destroy: async (email) => {
    const checkIfEmailexists = await User.findOne({
      where: { email },
      attributes: ['id', 'email'],
    });
    
    await User.destroy({ where: { id: checkIfEmailexists.id } });
  },
};

module.exports = userService;
