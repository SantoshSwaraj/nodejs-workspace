'use strict';

const mongoose = require('mongoose');

const Order = require('../models/orders.model');
const Product = require('../models/products.model');
const SERVER_CONGIF = require('../conf/server.conf');

module.exports.createOrder = (req,res,next)=>{
    Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: `http:/${SERVER_CONGIF.HOSTNAME}/:${SERVER_CONGIF.PORT}/orders/${result._id}`
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

module.exports.getOrders = (req,res,next)=>{
    Order.find()
    .select("product quantity _id")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: `http:/${SERVER_CONGIF.HOSTNAME}/:${SERVER_CONGIF.PORT}/orders/${doc._id}`
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

