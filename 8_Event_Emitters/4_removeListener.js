//Get the events module
const EventEmitter = require('events');

//extends the class
class MyEmitter extends EventEmitter{}

//get instance
const emitter = new MyEmitter();

const emitOptions = {
    dataLimit:6,
    dataCount:0
}

function dataListener(){
    console.log('Got data');
    emitOptions.dataCount++;
}
emitter.on('data', dataListener);

emitter.on('remove-data', function(){
    emitter.removeListener('data',dataListener);
})

let int = setInterval(function(){
    console.log('\n');
    emitter.emit('data');
    if(emitOptions.dataCount === emitOptions.dataLimit){
        emitter.emit('remove-data');
    }
    console.dir(emitOptions,{color:true});
},2000)