const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    country: String,
    date: Date,
    email: {
        type: String,
        unique: true
    },
    phone: Number,
    userName: String,
    password: String,
    countryFullName: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
