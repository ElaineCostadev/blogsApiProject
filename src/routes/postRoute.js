const express = require('express');

const postRoute = express.Router();

const postController = require('../MSC/postMSC/postController');
const tokenValidation = require('../middlewares/tokenValidation');
const validateBlogPost = require('../middlewares/validateBlogPost');

postRoute.post('/', tokenValidation, validateBlogPost, postController.create);
postRoute.get('/', tokenValidation, postController.getAll);
postRoute.get('/:id', tokenValidation, postController.getByPk);
postRoute.put('/:id', tokenValidation, validateBlogPost, postController.update);

module.exports = postRoute;
