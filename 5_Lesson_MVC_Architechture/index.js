'use strict';

require('./src/models/connection').open();
const express = require('express');
const empRoutes = require('./src/routers/employees.route');
const hostname = '127.0.0.1';
const port = 3000;


let app = express();

app.use('/', empRoutes);

app.get('/',(req,res,next)=>{
    res.send('Server is running');
})

app.listen(port,hostname,()=>{
    console.log(`Server running on http://${hostname}:${port}`);
})