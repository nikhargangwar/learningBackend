const express = require('express');
const app  = express();
const todoRouter = require('./src/routes.js');

//middleware to convert coming request in the form of json data
app.use(express.json());

//routes
app.use('/api/todos',todoRouter);

//starting server
app.listen(4000,()=>console.log('app started on port 4000'));