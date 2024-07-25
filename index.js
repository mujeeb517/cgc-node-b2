const express = require('express');
const homeRoutes = require('./routes/homeRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.listen(3000, () => console.log('Server is running 3000'));

app.use(express.json());

app.use('/', homeRoutes);
app.use('/api/v1/products', productRoutes);
