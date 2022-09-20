const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    chat: {
        type: String,
        required: true,
        trim: true
    },
    de: {
        type: String,
        required: true,
        trim: true
    },
    mensaje: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
}, { timestamps: true});

module.exports = mongoose.model('Message', messageSchema);