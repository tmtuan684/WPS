
var homeRouter = require('express').Router();
const { indexController, userDetailController  } = require('../controllers/home.controller')

homeRouter.get('/', indexController);
homeRouter.get('/users/:id', userDetailController);

module.exports = { homeRouter };

