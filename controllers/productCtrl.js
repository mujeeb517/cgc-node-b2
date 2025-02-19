const productRepo = require('../repositories/productRepo');
const logger = require('../utils/logger');

const getAll = async (req, res) => {
    logger.info('Get products api is called');
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

        for (let i = 0; i < data.length; i++) {
            data[i].image = data[i].image ? `${req.protocol}://${req.get('host')}/${data[i].image}` : undefined;
        }

        const metadata = {
            count,
            totalPages,
        };

        const response = {
            metadata,
            data,
        };
        logger.info('Products data is fetched');
        res.status(200);
        res.json(response);
        logger.info('Response is sent back');
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
        const reviews = await productRepo.getReviewsByProductId(id);
        const avgRating = await productRepo.getAvgRating(id);

        const rating = avgRating.length ? avgRating[0].average : undefined;

        const response = {
            ...data._doc,
            rating,
            reviews,
        };

        res.status(200);
        res.json(response);
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
        logger.error(err);
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

const postReview = async (req, res) => {
    try {
        req.body.createdDate = new Date();
        req.body.updatedDate = new Date();
        await productRepo.addReview(req.body);
        res.status(201).json({ message: 'Created' });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAll,
    post,
    getById,
    remove,
    put,
    patch,
    postReview,
};