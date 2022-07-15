const {PORT} = require('../config');

const Store = (file, path) => {
    if (!file || !path) throw new Error('Empty file or path');
    const filename =  `${+new Date()}-${file.name}`;
    file.mv(`./public/storage/${path}/${filename}`);
    return filename;
};

const GetUri = (req) => {
    let uri = `${req.protocol}://${req.hostname}`;
    if (req.hostname === 'localhost') uri += `:${PORT}`;
    uri += '/storage';
    return uri;
}

module.exports = {
    Store,
    GetUri,
};