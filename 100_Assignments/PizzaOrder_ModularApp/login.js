"use strict";
let user_module = require('./users');

module.exports.loginUser = (userName, password) =>{
    for(let user of user_module.users){
        if(user.userName === userName && user.password === password){
            return true;
        }
    }
    return false;
}
