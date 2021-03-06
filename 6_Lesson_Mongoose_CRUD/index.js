'use strict';

require('./src/helpers/dbconnection');
const express = require('express');
const bodyParser = require('body-parser');
const SERVER_CONFIG = require('./src/conf/server.conf');
const productRouter = require('./src/routers/products.route');
const orderRouter = require('./src/routers/orders.route');
const userRouter = require('./src/routers/users.route');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Enabling routes
app.use('/products',productRouter);
app.use('/orders',orderRouter);
app.use('/user', userRouter);

app.get('/', (req,res,next)=>{
    res.send(`Server is running on http://${SERVER_CONFIG.HOSTNAME}:${SERVER_CONFIG.PORT}`);
})

app.listen(SERVER_CONFIG.PORT,SERVER_CONFIG.HOSTNAME,()=>{
    console.log(`Server is running on http://${SERVER_CONFIG.HOSTNAME}:${SERVER_CONFIG.PORT}`);
})