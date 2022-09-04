const express = require('express');

const postRoute = express.Router();

const postController = require('../MSC/postMSC/postController');
const tokenValidation = require('../middlewares/tokenValidation');
const validateBlogPost = require('../middlewares/validateBlogPost');

postRoute.post('/', tokenValidation, validateBlogPost, postController.create);

postRoute.get('/search', tokenValidation, postController.search);
postRoute.get('/:id', tokenValidation, postController.getByPk);
postRoute.get('/', tokenValidation, postController.getAll);

postRoute.put('/:id', tokenValidation, validateBlogPost, postController.update);

postRoute.delete('/:id', tokenValidation, postController.destroy);

module.exports = postRoute;
