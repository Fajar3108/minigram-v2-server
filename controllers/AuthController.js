const {User} = require('../models');
const Bcrypt = require('../lib/Bcrypt');
const { AuthHelper, ResponseHelper } = require('../helpers');

const Login = async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        res.status(404)
        next(new Error('Username Not Found'));
    }

    try {
        const match = await Bcrypt.comparePassword(req.body.password, user.password);
        if (match) return res.json(ResponseHelper.success({ 
            status: 200,
            message: 'Login Success',
            data: {
                user,
                token: AuthHelper.generateToken(user),
            }
        }));
        
        res.status(403);
        next(new Error('Password do not match'));
    } catch(error) {
        res.status(500);
        next(error);
    }
};

const Register = async (req, res, next) => {
    try {
        const hashedPassword = await Bcrypt.hashPassword(req.body.password)
        const newUser = new User({ 
            username: req.body.username,
            password: hashedPassword,
            name: req.body.name,
        });
        await newUser.save();
        res.json(ResponseHelper.success({
            status: 201,
            message: 'Register Success',
            data: {
                user: newUser,
                token: AuthHelper.generateToken(newUser),
            },
        }));
    } catch(error) {
        res.status(500);
        next(new Error(error));
    }
}

module.exports = { 
    Login,
    Register,
};