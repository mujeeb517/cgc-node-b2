const express = require('express');
const productCtrl = require('./../controllers/productCtrl');
const { authoriseAdmin } = require('../middlewares/auth');
const router = express.Router();

router.get('/', productCtrl.getAll);
router.get('/page/:page/limit/:limit', productCtrl.getAll);

router.get('/:id', productCtrl.getById);
router.post('/', productCtrl.post);

router.delete('/:id', authoriseAdmin, productCtrl.remove);
router.put('/:id', authoriseAdmin, productCtrl.put);
router.patch('/:id', authoriseAdmin, productCtrl.patch);

module.exports = router;