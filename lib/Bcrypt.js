const { hash } = require('bcrypt');
const { SALT_ROUNDS } = require('../config');

const hashPassword = (password) => {
    return hash(password, Number(SALT_ROUNDS) || 10);
};

module.exports = { hashPassword };