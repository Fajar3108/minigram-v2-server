const db = require('mongoose');

const URI = process.env.MONGO_URI || 'mongodb://localhost/minigram';

const getConnection = () => {
    db.connect(URI)
    .then(() => console.log('Successfully connected to database!'))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });
};

module.exports = {
    getConnection,
}