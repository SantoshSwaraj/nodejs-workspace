'use strict';

const MongoClient = require('mongodb').MongoClient;
const dburl = "mongodb://root:root@127.0.0.1:27017/admin";

let _conn;
function open(){
    MongoClient.connect(dburl,{ useNewUrlParser: true },function(error,connection){
        if(error)
            console.log(error.errmsg);
        else{
            console.log('connection successfull');
            _conn = connection;
        }
    });
}

function getConnection(){
    return _conn;
}

process.on('SIGINT',function(){
    console.log("App Termination Due To SIGINT");
    _conn.close();
    process.exit(0); //leaving process
});

process.once('SIGTERM',function(){
    console.log("App Termination Due To SIGTERM");
    _conn.close();
    process.exit(0); //leaving process
});

process.once('SIGUSR2',function(){
    console.log("App Termination Due To SIGUSR2 /Userdefined Signal");
    _conn.close();
    process.kill(process.pid,'SIGUSR2'); //leaving process
});

module.exports = {
    open:open,
    getConnection:getConnection
}