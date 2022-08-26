const express = require('express');

const loginRoute = express.Router();

const loginController = require('../MSC/loginMSC/loginController');
const validateLogin = require('../middlewares/validateLogin');

loginRoute.post('/', validateLogin, loginController.login);

module.exports = loginRoute;