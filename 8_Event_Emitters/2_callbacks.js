//Get the events module
const EventEmiiter = require('events');

//extends the class
class MyEmitter extends EventEmiiter{}

//get instance 
const emitter = new MyEmitter();

//predefined
// function ListenForData(){
//     console.log('predefined function');
// }

// function ListenForData(message){
//     console.log(`predefined function :: ${message}`);
// }


// emitter.on('data',ListenForData);

emitter.on('data',function(a,b){
    console.log(this);
    console.log(`predefined function :: ${a} :: ${b}`);
});

emitter.on('data',(a,b)=>{
    console.log(this);
    console.log(`predefined function :: ${a} :: ${b}`); 
})
emitter.emit('data', 'Hello World Message', 'This is message Two');