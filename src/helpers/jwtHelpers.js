const jwt = require('jsonwebtoken');
const CustomError = require('../errors/CustomError');
require('dotenv/config');

const jwtSecret = process.env.JWT_SECRET;

const jwtCode = {
  generateToken: (data) => {
    const token = jwt.sign(
      { data: data.email },
      jwtSecret,
      { expiresIn: '4d', algorithm: 'HS256' },
    );
      
    return token;
  },

  validateToken: (token) => {
    try {
      const decode = jwt.verify(token, jwtSecret);
      return decode;
    } catch (error) {
      if (!token) throw new CustomError('401', 'Token not found');
    }
  },
};

module.exports = jwtCode;