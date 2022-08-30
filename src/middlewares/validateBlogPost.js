const CustomError = require('../errors/CustomError');

const validateBlogPost = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) throw new CustomError('400', 'Some required fields are missing');

  next();
};

module.exports = validateBlogPost;