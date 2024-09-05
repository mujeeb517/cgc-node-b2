const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is mandatory'],
        validate: {
            validator: function (val) {
                return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(val);
            },
            message: 'Invalid email format'
        }
    },
    password: {
        type: String, required: [true, 'Password is mandatory'],
        minLength: [8, 'Password should be atleast 8 chars']
    },
    role: String,
    active: Boolean,
    createdDate: Date,
    updatedDate: Date,
});

module.exports = mongoose.model('users', schema);
