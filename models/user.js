const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    artistName: {
        type: String,
        required: true,
    },
    songName: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
    }
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;