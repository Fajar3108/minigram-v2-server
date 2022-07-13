const { hash, compare } = require('bcrypt');
const { SALT_ROUNDS } = require('../config');

const hashPassword = (password) => {
    return hash(password, Number(SALT_ROUNDS) || 10);
};

const comparePassword = (password, hashedPassword) => {
    return compare(password, hashedPassword);
}

module.exports = { hashPassword, comparePassword };