const { NODE_ENV } = require("../config");

const notFoundHandler = (req, res, next) => {
    res.status(404);
    next(new Error(`Request route ${req.originalUrl} does not exist`));
};  

const errorHandler = (err, req, res, next) => {
    const code = res.statusCode !== 200 ? res.statusCode : 500;
    return res.json({
        errorCode: code,
        message: err.message,
        requestURL: req.originalUrl,
        stack: NODE_ENV === 'production' ? '' : err.stack,
    });
};

module.exports = {
    notFoundHandler,
    errorHandler,
};