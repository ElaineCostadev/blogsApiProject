const express = require('express');

const categoriesRoute = express.Router();

const categoriesController = require('../MSC/categoriesMSC/categoriesController');
const validateCategory = require('../middlewares/validateCategory');
const tokenValidation = require('../middlewares/tokenValidation');

categoriesRoute.post('/', tokenValidation, validateCategory, categoriesController.create);

categoriesRoute.get('/', tokenValidation, categoriesController.getAll);

module.exports = categoriesRoute;