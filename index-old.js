// Api, web api, Rest API, web service, Rest service, http service, 
// Backend service
// Server : Hardware, a machine, huge memory and disk space and huge processing power
// Server: software
// Http -> TCP 
// Your machine a simple server
// for local testing 
// NodeMon: restarts
const http = require('http');
const fs = require('fs');

// routing
const handler = (req, res) => {
    switch (req.url) {
        case '/':
            const contents = fs.readFileSync('./index.html');
            res.write(contents);
            res.end();
            break;
        case '/authors':
            res.write('List of Authors!');
            res.end();
            break;
        case '/books':
            res.write('List of  Books!');
            res.end();
            break;
        case '/products':
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

            // JSON: JS Object Notation
            // XML
            // serialization and deserialization
            // React -> NodeJS
            // React -> Java
            // Angular -> C#

            // Serialization: Convert an object into string format
            // Deserialization: Convert string data to object
            res.write(JSON.stringify(products));
            res.end();
            break;
        default:
            res.write('Not found');
            res.end();
            break;
    }
};

const server = http.createServer(handler);
const port = 3000;

// async, callbacks
server.listen(port, () => console.log('server is running on port', port));


