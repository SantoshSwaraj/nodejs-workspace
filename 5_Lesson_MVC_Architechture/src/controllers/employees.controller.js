'use strict';

const _conn = require('../models/connection');

module.exports.getEmployees=(req,res,next)=>{
    let offset = (!(req.query.offset==undefined))?Number(req.query.offset):0;
    let count = (!(req.query.count==undefined))?Number(req.query.count):3;
    let coll = _conn.getConnection().db('test').collection('people');
    coll.find({})
        .skip(offset)
        .limit(count)
        .toArray(function(error,docs){
            if(error){
                let err = {
                    name:"Internal Server Error",
                    message:"Users are not Found"
                }
                res.status(500).json(err);
            }else{
                res.status(200).json(docs);
            }
    })
}

module.exports.getEmployee=(req,res,next)=>{
    let coll = _conn.getConnection().db('test').collection('people');
    coll.findOne({"_id":Number(req.params.id)},function(error,doc){
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
}


module.exports.updateEmployee=(req,res,next)=>{
    console.log(req.params.id);
    console.log(req.body);
    if(req.params.id){
        let findQ =  {"_id":Number(req.params.id)};
        let updateQ = {"$set":req.body};
        let coll = _conn.getConnection().db('test').collection('people');
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

module.exports.deleteEmployee=(req,res,next)=>{
    if(req.params.id){
        let findQ = {"_id":Number(req.params.id)};
        let coll = _conn.getConnection().db('test').collection('people');
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


module.exports.insertEmployee=(req,res,next)=>{
    console.log(req.body._id);
    if(req.body){
        let coll = _conn.getConnection().db('test').collection('people');
        let data = [];
        if(req.body.length){
            data = req.body;
        }else{
            data.push(req.body);
        }
        coll.insertMany(data,(error,response)=>{
            if(error){
                let err = {
                    name:"Internal Server Error",
                    message:"Unable to Insert"
                }
                res.status(500).json(err);
            }else{
                res.status(200).json(response);
            }
        })
    }else{
        res.status(400).json({
            name:"Client Side Error",
            message:"Not Data Provided"
        })
    }
}