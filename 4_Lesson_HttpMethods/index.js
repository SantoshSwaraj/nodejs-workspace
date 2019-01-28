const express = require('express');
const bodyParser = require('body-parser');
const hostname = '127.0.0.1';
const port = 3000;

let app = express();
 
// parse application/json
app.use(bodyParser.json());

app.get('/',(request,response,next)=>{
    response.send('EMPLOYEE REST API');
});

app.post('/employee',(request,response,next)=>{
    if(!request.body)
        return response.sendStatus(400);
    response.status(200).json(request.body)
});

app.get('/account/:accountId/user/:userId',(request,response,next)=>{
    console.log(request.params);

    response.status(200).send("Request with params"+JSON.stringify(request.params));
});

app.listen(port,hostname,function(){
    console.log(`Server listening on https://${hostname}:${port}`);
})