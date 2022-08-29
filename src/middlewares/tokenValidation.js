const jwtSecret = process.env.JWT_SECRET;
const CustomError = require('../errors/CustomError');
const jwtHelpers = require('../helpers/jwtHelpers');
require('dotenv/config');

const tokenValidation = (req, _res, next) => {
  const { authorization } = req.headers;
  const data = jwtHelpers.validateToken(authorization, jwtSecret);
  if (!data) throw new CustomError('401', 'Expired or invalid token');
  // req.email = data;
  next();
};

module.exports = tokenValidation;