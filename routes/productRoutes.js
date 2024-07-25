const express = require('express');
const productCtrl = require('./../controllers/productCtrl');
const router = express.Router();

router.get('/', productCtrl.getAll);
router.get('/:id', productCtrl.getById);
router.delete('/:id', productCtrl.remove);
router.post('/', productCtrl.create);
router.put('/:id', productCtrl.update);
router.patch('/:id', productCtrl.patch);
    
module.exports = router;