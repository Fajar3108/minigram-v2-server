const Router = require('express').Router();

Router.use('/', require('./auth'));

module.exports = Router;