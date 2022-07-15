const { AuthMiddleware } = require('../../middlewares');

const Router = require('express').Router();

Router.use('/', require('./auth'));
Router.use('/posts', AuthMiddleware.verify, require('./post'));

module.exports = Router;