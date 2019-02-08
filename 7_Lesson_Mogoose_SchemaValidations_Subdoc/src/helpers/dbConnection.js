'use strict';

const mongoose = require('mongoose');
const DB_CONFIG = require('../conf/db.conf');
let options = {
    useNewUrlParser:true,
    user: DB_CONFIG.USERNAME,
    pass:DB_CONFIG.PASSWORD,
    authSource:DB_CONFIG.AUTH_DB
}

module.exports = mongoose.connect(DB_CONFIG.DBURL,options,(err)=>{
    if(err)
        console.log('ERROR',err.name);
})

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Connection Error : Connection Failed!'));

db.once('open',()=>{
    console.log(`Mongoose Connected Successfully on ${DB_CONFIG.DBURL}`);
})

//SIGINT is for terminating the process
//The default behavior is to terminate the process, 
//but it can be caught or ignored.it's for graceful shutdown(<Ctrl>+C)
process.on('SIGINT', function() {
    gracefullShutdown(' App terminating signal (SIGINT) ', () => {
      process.exit(0);
    });
});


//The SIGTERM signal used to cause program termination.
//this signal can be blocked, handled, and ignored.
process.on('SIGTERM', function() {
    gracefullShutdown(' App terminating signal (SIGTERM)', () => {
      process.exit(0);
    });
});

function gracefullShutdown(message, callback) {
    mongoose.connection.close(function() {
      console.log("Mongooose is DisConnected with App Termination");
      console.log("Connection Intruption by" + message);
      callback();
    });
}