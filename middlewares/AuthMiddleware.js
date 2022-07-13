const jwt = require('jsonwebtoken');
const tokenSecret = 'secret';

const verify = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(403);
        next(new Error('Please provide a token'));
    } else {
        jwt.verify(token.split(' ')[1], tokenSecret, (err, value) => {
            if (err) {
                res.status(500);
                next(new Error('Failed to authenticate token'));
            } else {
                req.user = value.data;
                next();
            }
        });
    }
}

module.exports = { verify };