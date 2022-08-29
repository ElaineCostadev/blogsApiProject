const CustomError = require('../errors/CustomError');

const validateUser = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const regexEmail = /\S+@\S+\.\S+/;

  if (displayName.length < 8) {
  throw new CustomError('400',
  '"displayName" length must be at least 8 characters long');
  }
  if (!regexEmail.test(email)) {
    throw new CustomError('400',
  '"email" must be a valid email');
  }

  if (password.length < 6) {
    throw new CustomError('400',
    '"password" length must be at least 6 characters long');
  }

  next();
};

module.exports = validateUser;
