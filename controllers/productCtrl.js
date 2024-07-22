function getAll(req, res) {
    const products = [{
        brand: 'Apple',
        model: 'Iphone 13',
        price: 700,
        inStock: true,
        discount: 5
    }, {
        brand: 'Apple',
        model: 'Iphone 14',
        price: 800,
        inStock: false,
        discount: 10
    }, {
        brand: 'Apple',
        model: 'Iphone 15',
        price: 900,
        inStock: true,
        discount: 5
    }, {
        brand: 'Apple',
        model: 'Iphone 13 Pro',
        price: 1000,
        inStock: true,
        discount: 5
    }];

    res.status(200);
    res.json(products);
}

module.exports = getAll;