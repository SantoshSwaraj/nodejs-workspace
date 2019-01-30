'use strict';

const _conn = require('../helpers/connection');
const ObjectID = require('mongodb').ObjectID;

module.exports.addUser=(req,res,next)=>{
    if(req.body){
        const coll = _conn.getConnection().db('test').collection('users');
        let data = [];
        if(req.body.lenght){
            data = req.body;
        }else{
            data.push(req.body);
        }    
        coll.insertMany(data,(error,result)=>{
            if(error){
                let err = {
                    "name": "Internal Server Error",
                    "message":"Unable to Insert"
                }
                res.status(500).json(err);
            }   
            else{
                res.status(200).json(result);
            }

        })
    }else{
        res.status(404).json({
            "name": "Client Side Error",
            "message":"No Data Provided"
        })
    }
}


module.exports.getUsers=(req,res,next)=>{
    const coll = _conn.getConnection().db('test').collection('users');
    const offset= (req.query.offset==undefined)?0:Number(req.query.offset);
    const limit = (req.query.limit)==undefined?10:Number(req.query.limit);
    coll.find({})
        .skip(offset)
        .limit(limit)
        .toArray(function(error,results){
            if(error){
                let err = {
                    name:"Internal Server Error",
                    message:"Unable to Fetch Data"
                }
                res.status(500).json(err);
            }else{
                res.status(200).json(results);
            }
        })
}



module.exports.getUser=(req,res,next)=>{
    if(req.params.userId){
        const coll = _conn.getConnection().db('test').collection('users');
        // console.log({"_id":ObjectID(req.params.userId)});
        const findQ = {"_id":ObjectID(req.params.userId)};
        coll.findOne(findQ,function(error,doc){
            if(error){
                let err = {
                    name:"Internal Server Error",
                    message:"Users are not Found"
                }
                res.status(500).json(err);
            }else{
                res.status(200).json(doc);
            }
        })
    }else{
        res.status(404).json({
            name:"Client Side Error",
            message:"Data not Provied"
        })
    }   
}



module.exports.updateUser=(req,res,next)=>{
    console.log(req.params.userId);
    console.log(req.body);
    if(req.params.userId){
        let findQ =  {"_id":ObjectID(req.params.userId)};
        let updateQ = {"$set":req.body};
        let coll = _conn.getConnection().db('test').collection('users');
        coll.updateOne(findQ,updateQ,function(error,doc){
            if(error){
                let err = {
                    name:"Internal Server Error",
                    message:"Users are not Found"
                }
                res.status(500).json(err);
            }else{
                res.status(200).json(doc);
            }
        })
    }else{
        res.status(404).json({
            name:"Not Found",
            message:"Id Not Found"
        })
    }
}

module.exports.deleteUser=(req,res,next)=>{
    if(req.params.userId){
        let findQ = {"_id":ObjectID(req.params.userId)};
        let coll = _conn.getConnection().db('test').collection('users');
        coll.deleteOne(findQ,function(error,doc){
            if(error){
                let err = {
                    name:"Internal Server Error",
                    message:"Users are not Found"
                }
                res.status(500).json(err);
            }else{
                res.status(200).json(doc);
            }
        })
    }else{
        res.status(404).json({
            name:"Not Found",
            message:"Id Not Found"
        });
    }
}