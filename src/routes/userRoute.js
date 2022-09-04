const express = require('express');

const userRoute = express.Router();

const userController = require('../MSC/userMSC/userController');
const validateUser = require('../middlewares/validateUser');
const tokenValidation = require('../middlewares/tokenValidation');

// ao criar um novo usuario eu não tenho ainda o token - 
userRoute.post('/', validateUser, userController.create);

// depois que ja criei sou obrigada a ter o token para ter acesso as informações
userRoute.get('/', tokenValidation, userController.getAll);
userRoute.get('/:id', tokenValidation, userController.getByPk);
userRoute.delete('/me', tokenValidation, userController.destroy);

module.exports = userRoute;