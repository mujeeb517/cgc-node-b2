const Product = require('../models/productModel');

const getCount = () => {
    return Product.countDocuments();
};

const getAll = (currentPage, pageSize) => {
    const recordsToSkip = (currentPage - 1) * pageSize;

    return Product
        .find({}, { __v: 0 })
        .skip(recordsToSkip)
        .limit(pageSize);
};

module.exports = {
    getCount,
    getAll,
};