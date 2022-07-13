const success = ({ status, message, data }) => ({
    status,
    message,
    data,
});

const error = ({ status, message, stack }) => ({
    status,
    message,
    stack,
});

module.exports = {
    success,
    error,
};