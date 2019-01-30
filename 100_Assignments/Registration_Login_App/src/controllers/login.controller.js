'use strict';
const _conn = require('../helpers/connection');

module.exports.getLogin=(req,res,next)=>{
    if(req.query.username && req.query.password){
        console.log(req.query.username + " " + req.query.password)
        const username = req.query.username;
        const password = req.query.password;
        let coll = _conn.getConnection().db('test').collection('users');
        coll.findOne({"username":username, "password":password},function(error,doc){
            if(error){
                let err = {
                    name:"Internal Server Error",
                    message:"Users are not Found"
                }
                res.status(500).json(err);
            }else{
                if(doc===null){
                    res.status(200).json({
                        name:"Authorization Failed",
                        message:"Username or password invalid"
                    })
                }else{
                    res.status(200).json({
                        name:"Authorization Success",
                        message:"Ok" 
                    });
                }  
            }
        })
    }else{
        res.status(404).json({
            name:"Client Side Error",
            message:"Username or password not provided"
        })
    }
    
} 
