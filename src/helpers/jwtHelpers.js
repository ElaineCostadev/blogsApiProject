const jwt = require('jsonwebtoken');
require('dotenv/config');

const jwtSecret = process.env.JWT_SECRET;

const jwtCode = {
  generateToken: (data) => {
    const token = jwt.sign(
      { data },
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
      throw new Error('Token not found');
    }
  },
};

module.exports = jwtCode;