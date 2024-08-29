const userRepo = require('../repositories/userRepo');
const bcrypt = require('bcryptjs');

const accountExists = err => err.message.indexOf('duplicate key error') > -1;

const signup = async (req, res) => {
    try {
        const body = req.body;
        body.createdDate = new Date();
        body.updatedDate = new Date();
        body.active = true; // send activation email
        body.password = await bcrypt.hash(body.password, 2);

        await userRepo.create(body);
        res.status(201);
        res.json({ message: 'Created' });
    } catch (err) {
        if (accountExists(err)) {
            res.status(400).json({ message: 'Email already exist' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};


module.exports = {
    signup
};