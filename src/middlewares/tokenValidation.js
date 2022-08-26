const jwtSecret = process.env.JWT_SECRET;
const jwtHelpers = require('../helpers/jwtHelpers');
require('dotenv/config');

const tokenValidation = (req, _res, next) => {
  const { authorization } = req.headers;
  const data = jwtHelpers.validateToken(authorization, jwtSecret);
  req.email = data;
  next();
};

module.exports = tokenValidation;