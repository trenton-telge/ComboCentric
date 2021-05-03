const mongoose = require('mongoose')

const comboSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        trim: true
    },
    cards: {
        type: [String],
        required: true
    }
});

const Combo = mongoose.model('Combo', comboSchema);
module.exports = Combo;