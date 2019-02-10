'use strict';

const router = require('express').Router();
const productsCtrl = require('../controllers/products.controller');
const multer = require('multer');
const upload = multer({dest:'uploads/'});

router
    .route('/', upload.single('productImage'))
    .get(productsCtrl.getProducts)
    .post(productsCtrl.createProduct)

router
    .route('/:productId')
    .get(productsCtrl.getProduct)
    .patch(productsCtrl.updateProduct)
    .delete(productsCtrl.deleteProduct)


module.exports = router;