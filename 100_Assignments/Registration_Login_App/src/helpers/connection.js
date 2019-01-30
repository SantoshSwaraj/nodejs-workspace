const MongoClient = require('mongodb').MongoClient;
const hostname = '127.0.0.1';
const port = 27017;
const username = 'root';
const password = 'root';
const authorizationDatabase = 'admin'
const dburl = `mongodb://${username}:${password}@${hostname}:${port}/${authorizationDatabase}`;

let _conn;
function open(){
    MongoClient.connect(dburl,{ useNewUrlParser: true },(error,connection)=>{
        if(error)
            throw error.errmsg;
        else{
            console.log('Connected Successfully');
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

