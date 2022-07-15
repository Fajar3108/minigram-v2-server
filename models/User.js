const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 32,
        match: /(^[a-zA-Z_])/,
        required: true,
    },
    profile: String,
    username: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 15,
        unique: true,
        match: /(^[a-zA-Z0-9_]+$)/,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);