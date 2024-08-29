const express = require('express');
const userCtrl = require('../controllers/userCtrl');

const router = express.Router();

// POST api/v1/users/signup
router.post('/signup', userCtrl.signup);

module.exports = router;