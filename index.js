const express = require('express');
const homeRoutes = require('./routes/homeRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.listen(3000, () => console.log('Server is running 3000'));

app.use('/', homeRoutes);
app.use('/', productRoutes);

/*
REST: Concept
    Representational state transfer
    Everything is a resource
    Resources are accessed by URL

    CRUD: Create, Read, Update and Delete

    Read:
    URL: localhost:3000/products
    URL: localhost:3000/products/1

    Principles:
    1. Uniform interface 
    2. Client server
    3. Cacheability
    4. Layered System
    5. Stateless

Http Verbs: GET(read), POST(create), PUT(update), DELETE(delete), PATCH(partial update)

GET: localhost:3000/products (safe operation)
POST: localhost:3000/products
PUT: localhost:3000/products/1
PATCH: localhost:3000/products/1
DELETE: localhost:3000/products/1

client - server
            service 2
                service 3
*/ 