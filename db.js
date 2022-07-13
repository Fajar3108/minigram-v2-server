const db = require('mongoose');
const {MONGO_URI} = require('./config');

const URI = MONGO_URI;

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