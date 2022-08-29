const express = require('express');

const categoriesRoute = express.Router();

const categoriesController = require('../MSC/categoriesMSC/categoriesController');
const validateCategory = require('../middlewares/validateCategory');
const tokenValidation = require('../middlewares/tokenValidation');

// ao criar um novo usuario eu não tenho ainda o token - 
categoriesRoute.post('/', tokenValidation, validateCategory, categoriesController.create);

// depois que ja criei sou obrigada a ter o token para ter acesso as informações
// categoriesRoute.get('/', tokenValidation, categoriesController.getAll);
// categoriesRoute.get('/:id', tokenValidation, categoriesController.getByPk);

module.exports = categoriesRoute;