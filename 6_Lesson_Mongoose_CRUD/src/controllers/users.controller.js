'use strict';

const mongoose = require('mongoose');
const User = require('../models/users.model');
const SERVER_CONGIF = require('../conf/server.conf');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.createUser = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            console.log(user);
            if (user.length >= 1) {
                res.status(409).json({
                    message: 'Mail Exits'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created'
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
}


module.exports.deleteUser = (req, res, next) => {
    User.findById(req.params.userId)
        .exec()
        .then(user => {
            console.log(user);
            if (user) {
                User.deleteOne({ '_id': req.params.userId })
                    .exec()
                    .then(result => {
                        console.log(result);
                        res.status(200).json({
                            message: 'User Deleted Successfully'
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
            }else{
                res.status(409).json({
                    message:'Invalid UserId'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

module.exports.loginUser = (req,res,next)=>{
    User.findOne({email:req.body.email})
        .exec()
        .then(user=>{
            console.log(user);
            if(user){
               bcrypt.compare(req.body.password,user.password,(err,result)=>{
                   if(err){
                        return res.status(401).json({
                            message:'Auth Failed' 
                        })  
                    }
                    if(result){
                        const token = jwt.sign({
                            email:user.email,
                            userId:user._id
                        }
                        ,process.env.JWT_KEY,
                        {
                            expiresIn:"1h"
                        });
                        return res.status(200).json({
                            JWT_KEY : process.env.JWT_KEY,
                            message:'Auth Successfull',
                            token:token 
                        })
                    }
                    return res.status(401).json({
                        message:'Auth Failed' 
                    }) 
               })
            }else{
                return res.status(401).json({
                    message:'Auth Failed' 
                })
            }
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({
                error:err
            })
        })
}