const express = require('express');
const getAll = require('./../controllers/productCtrl');
const router = express.Router();

router.get('/products', getAll);

module.exports = router;