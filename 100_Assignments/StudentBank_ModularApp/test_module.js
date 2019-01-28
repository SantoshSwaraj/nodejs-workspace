let accounts_module = require('./accounts_module');
let transaction_module = require('./transaction_module');

let account = new accounts_module.Account(105,'Rakesh Roshan', 1000);
let i = accounts_module.addAccount(account);
if(i==1){
    console.log('Account added Successfully');
}else{
    console.log('Unable to Add Account');
}

//console.log(transaction_module);
let deposit = transaction_module.deposit(105,2000);
if(deposit){
    console.log('deposited successfully');
}else{
    console.log('Unable to deposit');
}

let withdraw = transaction_module.withdraw(105,1000);
if(withdraw){
    console.log('withdraw successfully');
}else{
    console.log('Unable to withdraw');
}
