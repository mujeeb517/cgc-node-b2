const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true, 'Brand is mandatory'],
        minLength: [3, 'Brand should be min 3 chars'],
        maxLength: [20, 'Brand should be max 20 chars']
    },
    model: { type: String, required: [true, 'Model is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    inStock: { type: Boolean, default: false },
    discount: Number,
    createdDate: Date,
    updatedDate: Date,
});

schema.index({ brand: 1 });
schema.index({ model: 1 });

module.exports = mongoose.model('products', schema);