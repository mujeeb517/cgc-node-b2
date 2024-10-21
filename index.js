const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const config = require('./config');
const homeRoutes = require('./routes/homeRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const { tokenAuth } = require('./middlewares/auth');

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server is running 3000'));

mongoose.connect(config.dbConStr)
    .then(() => console.log('db connected successfully'))
    .catch(err => console.error(err));

app.use(cors());

// Terminal
app.use(morgan('dev'));

const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(path.join(__dirname, 'logs'))) {
    fs.mkdirSync(logsDir);
}

// File
var logFileStream = fs.createWriteStream(path.join(__dirname, 'logs', 'request.log'), { flags: 'a' })
app.use(morgan('combined', { stream: logFileStream }));

app.use(express.json());

app.use(express.static('uploads/'));

// public routes
app.use('/', homeRoutes);
app.use('/api/v1/users', userRoutes);

// app.use(basicAuth);
// app.use(tokenAuth);

// private routes
app.use('/api/v1/products', productRoutes);
