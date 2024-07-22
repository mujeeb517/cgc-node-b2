const express = require('express');
const homeRoutes = require('./routes/homeRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.listen(3000, () => console.log('Server is running 3000'));

app.use('/', homeRoutes);
app.use('/', productRoutes);



/*
 git init
 git status

 git add --all / git add .

tracked files/ untracked files
working area
staging area
commit
*/