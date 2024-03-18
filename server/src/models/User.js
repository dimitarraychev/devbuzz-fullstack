const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        required: [true, 'Username is required'],
        type: String,
    },
    email: {
        required: [true, 'Email is required'],
        type: String,
        lowercase: true,
        unique: true,
    },
    password: {
        required: [true, 'Password is required'],
        type: String,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;