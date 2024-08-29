const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    role: String,
    active: Boolean,
    createdDate: Date,
    updatedDate: Date,
});

module.exports = mongoose.model('users', schema);
