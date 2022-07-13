const AuthRouter = require('express').Router();

AuthRouter.post('/login', (req, res) => {
    res.json({
        message: 'Login Success',
    });
});

module.exports = AuthRouter;