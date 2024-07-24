const express = require('express');
const productCtrl = require('./../controllers/productCtrl');
const router = express.Router();

router.get('/products', productCtrl.getAll);
router.get('/products/:id', productCtrl.getById);
router.delete('/products/:id', productCtrl.remove);

module.exports = router;