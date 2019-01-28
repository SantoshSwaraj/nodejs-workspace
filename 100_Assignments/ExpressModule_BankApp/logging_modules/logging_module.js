const fs = require('fs');

let unqineLoggingIdGen=()=>{
    let date = new Date();
    let components = [
        date.getYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ];
    return components.join("");
}

//Asyn Write to user.json log of each user creation
module.exports.userLogger = (user)=>{
    let log = {};
    log.Id = unqineLoggingIdGen();
    log.user = user;
    fs.appendFile('user.json', JSON.stringify(log)+","+"\n", (err)=>{
        if(err)
            throw err;
        console.log(`Appended ${JSON.stringify(user)} to user.json`);
    })
}

//Asyn Write to user.json log of each user creation
module.exports.transactionLogger = (transaction)=>{
    let log = {};
    log.Id = unqineLoggingIdGen();
    log.transaction = transaction;
    fs.appendFile('../log_files/transaction.json', JSON.stringify(log)+","+"\n", (err)=>{
        if(err)
            throw err;
        console.log(`Appended ${JSON.stringify(transaction)} to transaction.json`);
    })
}