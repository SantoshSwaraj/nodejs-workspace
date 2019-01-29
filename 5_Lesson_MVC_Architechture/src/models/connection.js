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

module.exports = {
    open:open,
    getConnection:getConnection
}