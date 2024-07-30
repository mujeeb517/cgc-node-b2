const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    brand: String,
    model: String,
    price: Number,
    inStock: Boolean,
    discount: Number,
    createdDate: Date,
    updatedDate: Date,
});

module.exports = mongoose.model('products', schema);