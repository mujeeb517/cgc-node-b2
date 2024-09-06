const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    productId: {
        type: String,
        required: [true, 'Product Id is required']
    },
    subject: { type: String, required: [true, 'Subject is required'] },
    message: { type: String },
    rating: { type: Number, required: true },
    createdDate: Date,
    updatedDate: Date,
});

module.exports = mongoose.model('reviews', schema);