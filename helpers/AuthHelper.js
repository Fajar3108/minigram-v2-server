const jwt = require('jsonwebtoken');
const tokenSecret = 'secret';

const generateToken = (user) => {
    return jwt.sign({ data: user }, tokenSecret, { expiresIn: '24h' });
};

module.exports = {
    generateToken,
};