'use strict';

require('./src/helpers/connection').open();
const express = require('express');
const bodyParser = require('body-parser');
const registrationRoutes = require('./src/routers/registration.route');
const loginRoutes = require('./src/routers/login.router');
const hostname = '127.0.0.1';
const port = 3000;

// Create express App
let app = express();

//Enable body-parser to parser json
app.use(bodyParser.json());

//Enable route
app.use('/', registrationRoutes);
app.use('/', loginRoutes);

app.get('/',(req,res,next)=>{
    res.send('Server is running');
})

app.listen(port,hostname,()=>{
    console.log(`Server running on http://${hostname}:${port}`);
})
