const express = require('express');
const mongoose = require('mongoose');
const homeRoutes = require('./routes/homeRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const { basicAuth, tokenAuth } = require('./middlewares/auth');

const app = express();

app.listen(3000, () => console.log('Server is running 3000'));

mongoose.connect('mongodb://localhost:27017/cgc-b2')
    .then(() => console.log('db connected successfully'))
    .catch(err => console.error(err));

app.use(express.json());

// public routes
app.use('/', homeRoutes);
app.use('/api/v1/users', userRoutes);

// app.use(basicAuth);
// app.use(tokenAuth);

// private routes
app.use('/api/v1/products', productRoutes);
