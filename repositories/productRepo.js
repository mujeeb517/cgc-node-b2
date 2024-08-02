const Product = require('../models/productModel');


const getFilter = (search) => {
    return {
        $or: [
            { brand: new RegExp(search, 'i') },
            { model: new RegExp(search, 'i') }
        ]
    };
};

const getCount = (search) => {
    const filter = getFilter(search);
    return Product.countDocuments(filter);
};

const getAll = (currentPage, pageSize, search) => {
    const recordsToSkip = (currentPage - 1) * pageSize;
    const filter = getFilter(search);
    return Product
        .find(filter, { __v: 0 })
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