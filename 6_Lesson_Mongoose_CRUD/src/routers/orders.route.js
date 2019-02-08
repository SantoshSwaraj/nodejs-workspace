'use strict';

const router = require('express').Router();
const orderCtrl = require('../controllers/orders.controller');

router
    .route('/')
    .post(orderCtrl.createOrder)
    .get(orderCtrl.getOrders)

module.exports = router;