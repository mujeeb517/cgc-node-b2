const User = require('../models/userModel');

const create = (data) => {
    const dbUser = new User(data);
    return dbUser.save();
};

module.exports = {
    create,
};