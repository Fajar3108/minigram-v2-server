const {User} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenSecret = 'secret';

const Login = async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({
        status: 404,
        message: 'Username not found',
    });

    bcrypt.compare(req.body.password, user.password, (error, match) => {
        if (error) {
            res.status(500);
            next();
        } else if (match) {
            res.json({ token: jwt.sign({ data: user }, tokenSecret, { expiresIn: '24h' }) });
        } else {
            res.status(403);
            next(new Error('Password do not match'));
        }
    });
};

module.exports = { 
    Login,
};