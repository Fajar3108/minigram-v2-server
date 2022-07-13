const {User} = require('../models');
const bcrypt = require('bcrypt');
const Bcrypt = require('../lib/Bcrypt');
const { AuthHelper } = require('../helpers');

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
            res.json({ 
                status: 200,
                message: 'Login Success',
                data: user,
                token: AuthHelper.generateToken(user),
            });
        } else {
            res.status(403);
            next(new Error('Password do not match'));
        }
    });
};

const Register = async (req, res, next) => {
    try {
        const hashedPassword = await Bcrypt.hashPassword(req.body.password)
        const newUser = new User({ username: req.body.username, password: hashedPassword });
        await newUser.save();
        res.json({
            status: 201,
            message: 'Register Success',
            data: newUser,
            token: AuthHelper.generateToken(newUser),
        });
    } catch(error) {
        res.status(500);
        next(new Error(error.message));
    }
}

module.exports = { 
    Login,
    Register,
};