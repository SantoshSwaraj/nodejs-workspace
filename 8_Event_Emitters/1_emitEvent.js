//Get the events module
const EventEmiiter = require('events');

class MyEmitter extends EventEmiiter{}

const emitter = new MyEmitter();

emitter.on('message',function(){
    console.log('a message is emitted');
}).on('message',function(){
    console.log('this is not the right message');
}).on('event',function(){
    console.log('an event just occured');
})

setInterval(function(){
    emitter.emit('event');
},1000);