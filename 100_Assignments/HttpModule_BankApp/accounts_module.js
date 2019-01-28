"use strict";
let accounts = [
    {"accountId":101, "name": "Santosh", "balance":5000},
    {"accountId":102, "name": "Amit", "balance":10000},
    {"accountId":103, "name": "Rahul", "balance":2000},
    {"accountId":104, "name": "Deepak", "balance":8000}
];

const maxDepositAmt = 10000;
const minBalance = 500;

class Account{
    constructor(accountId,name,balance){
        this.accountId = accountId;
        this.name = name;
        this.balance = balance;
    }
}

function addAccount(account){
    if(getAccountById(account.accountId)!= null || account.balance < 500){
        return -1;
    }
    accounts.push(account);
    return 1;
}

function getAccountById(accountId){
    let isAccount = false;
    for(let account of accounts){
        if(account.accountId == accountId){
            isAccount = true;
            return account;
        }
    }
    if(!isAccount)
        return null;
}

function getBalanceById(accountId){
    let account = getAccountById(accountId);
    if(account){
        return account.balance;
    }else{
        return null;
    }
}

module.exports = {
    accounts:accounts,
    maxDepositAmt:maxDepositAmt,
    minBalance:minBalance,
    Account : Account,
    addAccount:addAccount,
    getAccountById:getAccountById,
    getBalanceById:getBalanceById
}