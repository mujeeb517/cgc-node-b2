const User = require('../models/userModel');

const create = (data) => {
    const dbUser = new User(data);
    return dbUser.save();
};

const getUserByEmail = (email) => {
    return User.findOne({ email: email });
};

module.exports = {
    create,
    getUserByEmail,
};