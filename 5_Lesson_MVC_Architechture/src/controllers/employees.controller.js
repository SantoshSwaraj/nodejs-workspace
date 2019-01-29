'use strict';

const _conn = require('../models/connection');

module.exports.getEmployees=(req,res,next)=>{
    let coll = _conn.getConnection().db('test').collection('people');
    coll.find({}).toArray(function(error,docs){
        if(error){
            var err = {
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
            var err = {
                name:"Internal Server Error",
                message:"Users are not Found"
            }
            res.status(500).json(err);
        }else{
            res.status(200).json(doc);
        }
    })
}