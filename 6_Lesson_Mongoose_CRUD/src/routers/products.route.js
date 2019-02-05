'use strict';

const router = require('express').Router();
const productsCtrl = require('../controllers/products.controller');

router
    .route('/')
    .get(productsCtrl.getProducts)
    .post(productsCtrl.createProduct)

router
    .route('/:productId')
    .get(productsCtrl.getProduct)
    .patch(productsCtrl.updateProduct)
    .delete(productsCtrl.deleteProduct)


module.exports = router;