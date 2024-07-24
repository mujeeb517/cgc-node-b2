// in memory
const products = [{
    id: 1,
    brand: 'Apple',
    model: 'Iphone 13',
    price: 700,
    inStock: true,
    discount: 5
}, {
    id: 2,
    brand: 'Apple',
    model: 'Iphone 14',
    price: 800,
    inStock: false,
    discount: 10
}, {
    id: 3,
    brand: 'Apple',
    model: 'Iphone 15',
    price: 900,
    inStock: true,
    discount: 5
}, {
    id: 4,
    brand: 'Apple',
    model: 'Iphone 13 Pro',
    price: 1000,
    inStock: true,
    discount: 5
}];

function getAll(req, res) {
    res.status(200);
    res.json(products);
}

function getById(req, res) {
    const id = +req.params.id;
    let product;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            product = products[i];
        }
    }

    if (product) {
        res.status(200);
        res.json(product);
    } else {
        res.status(404);
        res.send('Not found');
    }
}

function remove(req, res) {
    const id = +req.params.id;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            products.splice(i, 1);
            break;
        }
    }

    res.status(204); // No Content
    res.send();
}


module.exports = {
    getAll,
    getById,
    remove
};


// index.js -> routes -> ctrl

// URL: DELETE localhost:3000/products/:id
