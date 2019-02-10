//Get the events module
const EventEmitter = require('events');

//extends the class
class MyEmitter extends EventEmitter{}

//get instance
const emitter = new MyEmitter();

emitter
    .on('message',function(){
        console.log("a message was emitted");
    })
    .addListener('message',()=>{
        console.log('added with addListener');
    })
    .once('message',()=>{
        console.log('I will only fire once');
    })
    .prependListener('message',()=>{
        console.log('I will fire first');
    })
    .prependOnceListener('message',()=>{
        console.dir('I am the winner',{color:true});
    })

setInterval(function(){
    console.log('\n');
    emitter.emit('message');
},2000);
