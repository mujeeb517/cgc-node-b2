const productRepo = require('../repositories/productRepo');

const getAll = async (req, res) => {
    const currentPage = +req.params.page || 1;
    const pageSize = +req.params.limit || 10;
    const search = req.query.search || '';
    const sort = req.query.sort || 'updatedDate';
    const direction = req.query.direction || 'desc';

    try {
        const count = await productRepo.getCount(search);
        const totalPages = Math.ceil(count / pageSize);

        const options = {
            currentPage,
            pageSize,
            search,
            sort,
            direction
        };

        const data = await productRepo.getAll(options);
        const metadata = {
            count,
            totalPages,
        };

        const response = {
            metadata,
            data,
        };
        res.status(200);
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500);
        res.send('Internal server error');
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await productRepo.getById(id);
        res.status(200);
        res.json(data);
    } catch (err) {
        res.status(500);
        res.send('Internal server error');
    }
};


const prepareValidationErrors = (errors) => {
    const msgs = [];
    for (let key in errors) {
        msgs.push(errors[key].message);
    }
    return msgs;
};

const post = async (req, res) => {
    try {
        await productRepo.create(req.body);
        res.status(201);
        res.send('Successfully created');
    } catch (err) {
        if (err.message.indexOf('validation failed') > -1) {
            res.status(400).json(prepareValidationErrors(err.errors));
        } else
            res.status(500).json({ message: 'Internal server error' });
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        await productRepo.remove(id);
        res.status(204);
        res.send();
    } catch (err) {
        res.status(500);
        res.send('Internal server error');
    }
};

const put = async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    await productRepo.update(id, payload);
    res.status(204);
    res.send();
};

const patch = async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    await productRepo.patch(id, payload);
    res.status(204);
    res.send();
};

module.exports = {
    getAll,
    post,
    getById,
    remove,
    put,
    patch,
};


// Authentication: identifying, PIN, Fingerprint, FaceId, credentials(username & password) 
// Basic, Token
// Authorisation: permission