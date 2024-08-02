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

const getById = (id) => {
    return Product.findById(id, { __v: 0 });
};

const create = (pyaload) => {
    pyaload.createdDate = new Date();
    pyaload.updatedDate = new Date();
    const product = new Product(pyaload);

    return product.save();
};

const remove = (id) => {
    return Product.deleteOne({ _id: id });
};

const update = (id, payload) => {
    payload.updatedDate = new Date();
    return Product.updateOne({ _id: id }, payload);
};

const patch = (id, payload) => {
    const updateObj = {};
    for (let key in payload) {
        updateObj[key] = payload[key];
    }

    updateObj.updatedDate = new Date();
    return Product.updateOne({ _id: id }, { $set: updateObj });
};

module.exports = {
    getCount,
    getAll,
    getById,
    create,
    remove,
    update,
    patch,
};