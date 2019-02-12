'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');
const SERVER_CONFIG = require('./src/conf/server.conf');

// Init Nexmo
const nexmo = new Nexmo({
    apiKey: 'dc60a6ee',
    apiSecret: 'p8iFenw59089wDzF'
},{debug:true})
  

//Init app
const app = express();

// Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

//Public folder setup
app.use(express.static(__dirname +'/public'));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Index route
app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/', (req,res)=>{
    // res.send(req.body);
    // console.log(req.body);
    const from = 'Nexmo';
    const to = req.body.number;
    const text = req.body.text;
    nexmo.message.sendSms(from, to, text,{type:'unicode'},(err,responseData)=>{
        if(err){
            console.log(err);
        }else{
            console.log(responseData);
            // Get data from response
            const data = {
                id: responseData.messages[0]['message-id'],
                number: responseData.messages[0]['to']
            }

            //Emit to the client
            io.emit('smsStatus', data);
        }
    });
});

const server = app.listen(SERVER_CONFIG.PORT,SERVER_CONFIG.HOSTNAME,()=>{
    console.log(`Server is running on http://${SERVER_CONFIG.HOSTNAME}:${SERVER_CONFIG.PORT}`);
});

//Connect to socket.io
const io = socketio(server);
io.on('connection',(socket)=>{
    console.log('Connected');
    io.on('disconnect',(socket)=>{
        console.log('Disconnected');
    })
})

