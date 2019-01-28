"use strict";
let users = [
    {
        "userId":1000,
        "userName":"Mike",
        "password":"mike123"
    },
    {
        "userId":1001,
        "userName":"Will",
        "password":"will123"
    },
    {
        "userId":1002,
        "userName":"James",
        "password":"james123"
    },
    {
        "userId":1003,
        "userName":"Park",
        "password":"park123"
    }     
]

module.exports.getUserById = (userId)=>{
    for(let user of users){
        if(user.userId == userId){
            return user;
        }
    }
    return null;
}


