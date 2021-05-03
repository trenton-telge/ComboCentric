const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        trim: true
    },
    combo: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
        trim: false
    },
    postdate: {
        type: String,
        required: false,
        trim: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;