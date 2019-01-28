let accounts_module = require('./accounts_module');

function deposit(accountId, dAmt){
    let balance = accounts_module.getBalanceById(accountId);
    if(balance!=null && dAmt <= accounts_module.maxDepositAmt){
        let account = accounts_module.getAccountById(accountId);
        account.balance += dAmt;
        return true;
    }
    return false;
}

function withdraw(accountId, wAmt){
    let balance = accounts_module.getBalanceById(accountId);
    if((balance!=null) && (balance-wAmt > accounts_module.minBalance)){
        let account = accounts_module.getAccountById(accountId);
        account.balance -=wAmt;
        return true;
    }
    return false;
}

module.exports = {
    deposit:deposit,
    withdraw:withdraw
}