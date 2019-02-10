'use strict';

const router = require('express').Router();
const orderCtrl = require('../controllers/orders.controller');


router
    .route('/')
    .post(orderCtrl.createOrder)
    .get(orderCtrl.getOrders)

router
    .route('/:orderId')
    .get(orderCtrl.getOrder)
    .delete(orderCtrl.deleteOrder)

module.exports = router;