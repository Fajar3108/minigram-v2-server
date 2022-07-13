const { AuthController } = require('../../controllers');

const AuthRouter = require('express').Router();

AuthRouter.post('/login', AuthController.Login);

module.exports = AuthRouter;