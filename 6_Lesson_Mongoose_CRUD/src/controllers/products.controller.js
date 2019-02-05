'use strict';

const mongoose = require('mongoose');
const Product = require('../models/products.model');

module.exports.createProduct = (req,res,next) =>{
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    });
    product
        .save()
        .then(result=>{
            res.status(200).json({
                message:"Handling POST resquets to /products",
                createProduct:result
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
}

module.exports.getProducts = (req,res,next) => {
    Product
        .find()
        .exec()
        .then(docs =>{
            res.status(200).json(docs);
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
        .exec()
        .then(doc=>{
            res.status(200).json(doc);
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
            res.status(200).json(result);
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
            res.status(200).json(result);
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        });
}