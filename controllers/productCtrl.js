const productRepo = require('../repositories/productRepo');

const getAll = async (req, res) => {
    let currentPage = req.params.page || 1;
    let pageSize = req.params.limit || 10;

    try {
        const count = await productRepo.getCount();
        const totalPages = Math.ceil(count / pageSize);

        const data = await productRepo.getAll(currentPage, pageSize);
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

const post = async (req, res) => {
    await productRepo.create(req.body);
    res.status(201);
    res.send('Successfully created');
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
