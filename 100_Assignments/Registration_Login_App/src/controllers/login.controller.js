'use strict';

const _conn = require('../helpers/connection');

module.exports.checkLogin=(req,res,next)=>{
    if(req.body.username && req.body.password){
        //console.log(req.query.username + " " + req.query.password)
        const username = req.body.username;
        const password = req.body.password;
        let coll = _conn.getConnection().db('test').collection('users');
        coll.findOne({"username":username},function(error,user){
            if(error){
                let err = {
                    name:"Internal Server Error",
                    message:"Server Failed",
                    status:false
                }
                res.status(500).json(err);
                }else if(user===null){
                    res.status(400).json({
                        name:"Authorization Failed",
                        message:"Invalid Username",
                        status:false
                    })   
                }
                else if(user && user.password === password){
                    res.status(200).json({
                        name:"Authorization Success",
                        message:"Success",
                        status:true,
                        user:user
                    });
                }else{
                    res.status(400).json({
                        name:"Authorization Failed",
                        message:"Invalid Password",
                        status:false
                    });
                }         
            }
        )
        }else{
            res.status(404).json({
                name:"Client Side Error",
                message:"Username or password not provided"
            })
        }
    
} 
