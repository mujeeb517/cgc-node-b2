const userRepo = require('../repositories/userRepo');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const accountExists = err => err.message.indexOf('duplicate key error') > -1;

const signup = async (req, res) => {
    try {
        const body = req.body;
        body.createdDate = new Date();
        body.updatedDate = new Date();
        body.active = true; // send activation email
        body.role = 'User';
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

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const dbUser = await userRepo.getUserByEmail(email);
        if (!dbUser) {
            return res.status(401).json({ message: 'Unuthorised' });
        }
        const isValid = await bcrypt.compare(password, dbUser.password);
        if (isValid) {
            const token = jwt.sign({ email: dbUser.email, role: dbUser.role }, config.jwtSecret, {
                expiresIn: '1d'
            });
            res.status(200).send({ token: token });
        } else {
            res.status(401).json({ message: 'Unuthorised' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    signup,
    signin,
};
