const express = require('express');
const productCtrl = require('./../controllers/productCtrl');
const { authoriseAdmin } = require('../middlewares/auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname;
        req.body.image = name;
        cb(null, name);
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', productCtrl.getAll);
router.get('/page/:page/limit/:limit', productCtrl.getAll);

router.get('/:id', productCtrl.getById);
router.post('/', upload.single('image'), productCtrl.post);

router.delete('/:id', authoriseAdmin, productCtrl.remove);
router.put('/:id', authoriseAdmin, productCtrl.put);
router.patch('/:id', authoriseAdmin, productCtrl.patch);

router.post('/reviews', productCtrl.postReview);

module.exports = router;