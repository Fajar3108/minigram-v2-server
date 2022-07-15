const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    user_id: {
        type: mongoose.ObjectId,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    visibility: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 100,
        required: false,
    },
    description: {
        type: String,
        text: true,
        required: false,
    },
    files: [{
        type: String,
    }],
    likes: [
        mongoose.Schema({
            user_id: {
                type: mongoose.ObjectId,
                required: true,
            },
        })
    ],
    comments: [
        mongoose.Schema({
            user_id: {
                type: mongoose.ObjectId,
                required: true,
            },
            body: {
                type: String,
                required: true,
            },
        }, {timestamps: true})
    ],
}, {timestamps: true});

module.exports = mongoose.model('Post', PostSchema);