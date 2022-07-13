const { AuthController } = require('../../controllers');

const AuthRouter = require('express').Router();

AuthRouter.post('/login', AuthController.Login);
AuthRouter.post('/register', AuthController.Register);

module.exports = AuthRouter;