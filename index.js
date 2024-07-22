const express = require('express');
const homeRoutes = require('./routes/homeRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.listen(3000, () => console.log('Server is running 3000'));

app.use('/', homeRoutes);
app.use('/', productRoutes);



/*
 git init
 git remote add origin git@github.com:mujeeb517/cgc-node-b2.git
 git status

 git add --all / git add .
 git commit -m "initial commit"
 git push origin main

tracked files/ untracked files
working area
staging area
commit
*/