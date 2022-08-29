const express = require('express');

const userRoute = express.Router();

const userController = require('../MSC/userMSC/userController');
const validateUser = require('../middlewares/validateUser');

userRoute.post('/', validateUser, userController.create);

module.exports = userRoute;