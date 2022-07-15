const Router = require('express').Router();

Router.use('/', require('./auth'));
Router.use('/posts', require('./post'));

module.exports = Router;