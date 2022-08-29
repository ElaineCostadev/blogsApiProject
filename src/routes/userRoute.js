const express = require('express');

const userRoute = express.Router();

const userController = require('../MSC/userMSC/userController');
const validateUser = require('../middlewares/validateUser');
const tokenValidation = require('../middlewares/tokenValidation');

userRoute.get('/', tokenValidation, userController.getAll);
userRoute.post('/', validateUser, userController.create);

module.exports = userRoute;