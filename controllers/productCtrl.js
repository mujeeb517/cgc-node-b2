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

function isValid(payload) {
    return payload.brand && payload.model && payload.price;
}

function create(req, res) {
    const payload = req.body;

    if (isValid(payload)) {
        products.push(payload);

        res.status(201); // Created
        res.send('Successfully created');
    }
    else {
        res.status(400); // Bad request
        res.send('Invalid payload');
    }
}

function update(req, res) {
    const id = +req.params.id;
    const payload = req.body;

    if (!isValid(payload)) {
        res.status(400);
        res.send('Invalid payload');
        return;
    }
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            products[i].brand = payload.brand;
            products[i].model = payload.model;
            products[i].price = payload.price;
            products[i].inStock = payload.inStock;
        }
    }

    res.status(204);
    res.send();
}

function patch(req, res) {
    const id = +req.params.id;
    const payload = req.body;

    // for (let i = 0; i < products.length; i++) {
    //     if (products[i].id === id) {
    //         const product = products[i];
    //         for (let key in payload) {
    //             product[key] = payload[key];
    //         }
    //     }
    // }

    const product = products.find(elem => elem.id === id);
    if (!product) {
        res.status(404);
        res.send('Not found');
    } else {
        for (let key in payload) {
            product[key] = payload[key];
        }

        res.status(204);
        res.send();
    }
}

module.exports = {
    getAll,
    getById,
    remove,
    create,
    update,
    patch,
};
