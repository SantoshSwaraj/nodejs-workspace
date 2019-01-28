"use strict";
let user_module = require('./users');

class User{
    constructor(userId,userName){
        this.userId = userId;
        this.userName = userName;
    }
}

function addUser(user){
    if(getUserById(user.userId) == null){
        users.push(user);
        return 1;
    }
    return -1;
}

module.exports = {
    User:User,
    addUser:addUser
}