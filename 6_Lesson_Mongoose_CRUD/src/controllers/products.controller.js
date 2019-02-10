'use strict';

const mongoose = require('mongoose');
const Product = require('../models/products.model');
const SERVER_CONGIF = require('../conf/server.conf');

const multer = require('multer');
const upload = multer({dest:'uploads/'});

module.exports.createProduct = (req,res,next) => {
    if(!(req.body.name && req.body.price)){
        res.status(404).json({
            message:'Require product name and price field'
        })
    }else{
        const product = new Product({
            _id : new mongoose.Types.ObjectId(),
            name : req.body.name,
            price : req.body.price
        });
        product
            .save()
            .then(result=>{
                console.log(result);
                res.status(201).json({
                    message:"Created Product Successfully",
                    createProduct:{
                        name:result.name,
                        price:result.price,
                        _id:result._id,
                        request:{
                            type:"GET",
                            url:`http://${SERVER_CONGIF.HOSTNAME}:${SERVER_CONGIF.PORT}/products/${result._id}`
                        }
                    }
                });
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({
                    error:err
                });
            });
    }
}

module.exports.getProducts = (req,res,next) => {
    Product
        .find()
        .select("name price _id")
        .exec()
        .then(docs =>{
            let response = {
                count:docs.length,
                products:docs.map(doc=>{
                    return{
                        _id:doc._id,
                        name:doc.name,
                        price:doc.price,
                        request:{
                            type:"GET",
                            url:`http://${SERVER_CONGIF.HOSTNAME}:${SERVER_CONGIF.PORT}/products/${doc._id}`
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
}

module.exports.getProduct = (req,res,next) =>{
    const produtId = req.params.productId;
    Product
        .findById(produtId)
        .select('_id name price')
        .exec()
        .then(doc=>{
            let response = {
                _id : doc._id,
                name : doc.name,
                price : doc.price,
                request : [
                    {
                        type:'GET',
                        desc : 'GET_ALL_PRODC',
                        url:`http://${SERVER_CONGIF.HOSTNAME}:${SERVER_CONGIF.PORT}/products`,
                        
                    },
                    {
                        type:'PATCH',
                        body:`[{'propName':'name','value':'<String type>'},{'propName':'price','value':'<Number type>'}]`,
                        url:`http://${SERVER_CONGIF.HOSTNAME}:${SERVER_CONGIF.PORT}/products/${doc._id}`
                        
                    },
                    {
                        type:'DELETE',
                        url:`http://${SERVER_CONGIF.HOSTNAME}:${SERVER_CONGIF.PORT}/products/${doc._id}`
                        
                    }
                ]
            }
            res.status(200).json(response);
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            });
        });
}

module.exports.updateProduct = (req,res,next) =>{
    const productId = req.params.productId;
    const updateOps = {};
    for(const ops of req.body)
        updateOps[ops.propName]=ops.value;
    Product
        .update({"_id":productId},{$set:updateOps})
        .exec()
        .then(result=>{
            let response = {
                message:`${productId} Updated Successfully`,
                request:{
                    type:"GET",
                    url:`http://${SERVER_CONGIF.HOSTNAME}:${SERVER_CONGIF.PORT}/products/${doc._id}`
                }
            }
            res.status(200).json(response);
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            });
        });
}

module.exports.deleteProduct = (req,res,next) =>{
    const productId = req.params.productId;
    Product
        .deleteOne({"_id": productId})
        .exec()
        .then(result=>{
            let response = {
                message:`${productId} Deleted Successfully`,
                request : {
                    type:'POST',
                    desc : 'CREATE_NEW_PRODC',
                    body : `{'name':<String>, 'value':<Number>}`,
                    url:`http://${SERVER_CONGIF.HOSTNAME}:${SERVER_CONGIF.PORT}/products`,
                }
            }
            res.status(200).json(result);
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        });
}