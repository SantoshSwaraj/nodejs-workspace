'use strict';

require('./src/helpers/dbConnection');
const express = require('express');
const bodyParser = require('body-parser');
const SERVER_CONFIG = require('./src/conf/server.conf');
const testRouter = require('./src/routers/test.route');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Enabling routes
app.use('/test',testRouter);

app.get('/', (req,res,next)=>{
    res.send(`Server is running on http://${SERVER_CONFIG.HOSTNAME}:${SERVER_CONFIG.PORT}`);
})

app.listen(SERVER_CONFIG.PORT,SERVER_CONFIG.HOSTNAME,()=>{
    console.log(`Server is running on http://${SERVER_CONFIG.HOSTNAME}:${SERVER_CONFIG.PORT}`);
})