const userRepo = require('../repositories/userRepo');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const config = require('../config');

const accountExists = err => err.message.indexOf('duplicate key error') > -1;

const signup = async (req, res) => {
    try {
        logger.info('user creation initiated');
        const body = req.body;
        body.createdDate = new Date();
        body.updatedDate = new Date();
        body.active = true; // send activation email
        body.role = 'User';
        body.password = await bcrypt.hash(body.password, 2);

        await userRepo.create(body);
        logger.info('user creation success');
        res.status(201);
        res.json({ message: 'Created' });
    } catch (err) {
        logger.error(err);
        if (accountExists(err)) {
            res.status(409).json({ message: 'Email already exist' });  // conflict
        }
        else if (err.message.indexOf('validation failed') > -1) {
            res.status(400).json(err.errors);
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
