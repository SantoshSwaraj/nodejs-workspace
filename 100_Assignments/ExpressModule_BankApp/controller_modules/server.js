"use strict";
const express = require('express');
const accounts_module = require('../bank_modules/accounts_module');
const transaction_module = require('../bank_modules/transaction_module');
const logging_module = require('../logging_modules/logging_module');
const hostname = '127.0.0.1';
const port = 3034;
let transaction = {};

var app = express();
  
app.get('/', function (request , response) {
    response.send('Welcome to Student Bank Of India');
});

app.get('/addAccount', function(request, response){
    let acc = request.query;
    //console.log(account);
    let account = new accounts_module.Account(acc.accountId,acc.name, acc.balance);
    let i = accounts_module.addAccount(account);
    if(i==1){
        response.send(`Account ${account.accountId} Added Successfully`);
        logging_module.userLogger(account);
    }else{
        response.send('Unable to Add Account');
    }
});

app.get('/deposit',function(request,response){
    let dep = request.query;
    let deposit = transaction_module.deposit(dep.accountId,dep.amt);
        if(deposit){
            response.send(`Amount ${dep.amt} deposited successfully on Account ${dep.accountId}`);
            transaction.accId = 105;
            transaction.Operation = "deposit";
            transaction.amt = 2000;
            logging_module.transactionLogger(transaction);
        }else{
            response.send('Unable to deposit');
        }
});


app.get('/withdraw', function(request, response){
    let wDraw = request.query;
    let withdraw = transaction_module.withdraw(wDraw.accountId,wDraw.amt);
        if(withdraw){
            response.send(`Amount ${wDraw.amt} Withdraw Successfully from AccountId ${wDraw.accountId}`);
            transaction.accId = 105;
            transaction.Operation = "withdraw";
            transaction.amt = 1000;
            logging_module.transactionLogger(transaction);
        }else{
            response.send('Unable to withdraw');
        }
});
 
app.get('/getBalanceById',function(request,response){
    let balance = accounts_module.getBalanceById(request.query.accountId);
    if(balance)
        response.send(`AccountId: ${request.query.accountId} Balance: ${balance}`);
    else
        response.send('Unable to get Balance');
});

app.get('/getAllAccounts', function(request,response){
    response.send(JSON.stringify(accounts_module.accounts));
});

app.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});

