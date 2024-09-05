const bunyan = require('bunyan');
const path = require('path');

// debug, info, warn, error
const log = bunyan.createLogger({
    name: 'products-api',
    streams: [{
        level: 'info',
        path: path.join(__dirname, '..', 'logs', 'application.log')
    }, {
        level: 'info',
        stream: process.stdout
    }]
});

module.exports = log;