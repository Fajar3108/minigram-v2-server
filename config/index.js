module.exports = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/minigram',
};