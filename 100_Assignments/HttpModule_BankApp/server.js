"use strict";
const http = require('http');
const accounts_module = require('./accounts_module');
const transaction_module = require('./transaction_module');
const logging_module = require('./logging_module')
const hostname = '127.0.0.1';
const port = 3030;
let transaction = {};

const server = http.createServer(function(request,response){
    response.setHeader('Content-Type','text/plain');
    if(request.url=='/'){
        response.statusCode = 200;
        response.end('Welcome to Student Bank Of India');
    }
    
    if(request.url=='/addAccount'){
        response.statusCode = 200;
        let account = new accounts_module.Account(105,'Rakesh Roshan', 1000);
        let i = accounts_module.addAccount(account);
        if(i==1){
            response.end(`Account ${account.accountId} Added Successfully`);
            logging_module.userLogger(account);
        }else{
            response.end('Unable to Add Account');
        }
    }

    if(request.url=='/deposit'){
        response.statusCode = 200;
        let deposit = transaction_module.deposit(105,2000);
        if(deposit){
            response.end(`Amount ${2000} deposited successfully on Account ${105}`);
            transaction.accId = 105;
            transaction.Operation = "deposit";
            transaction.amt = 2000;
            logging_module.transactionLogger(transaction);
        }else{
            response.end('Unable to deposit');
        }
    }

    if(request.url=='/withdraw'){
        response.statusCode = 200;
        let withdraw = transaction_module.withdraw(105,1000);
        if(withdraw){
            response.end(`Amount ${1000} Withdraw Successfully from AccountId ${105}`);
            transaction.accId = 105;
            transaction.Operation = "withdraw";
            transaction.amt = 1000;
            logging_module.transactionLogger(transaction);
        }else{
            response.end('Unable to withdraw');
        }
    }
    else{
        response.statusCode = 200;
        response.end('Thanks!!');
    }
});

server.listen(port,hostname,111,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});