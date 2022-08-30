const express = require('express');

const postRoute = express.Router();

const postController = require('../MSC/postMSC/postController');
const tokenValidation = require('../middlewares/tokenValidation');
const validateBlogPost = require('../middlewares/validateBlogPost');

postRoute.post('/', tokenValidation, validateBlogPost, postController.create);
postRoute.get('/', tokenValidation, postController.getAll);

module.exports = postRoute;
