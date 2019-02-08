'use strict';

const router = require('express').Router();
const testCtrl = require('../controllers/test.controller');

router
    .route('/')
    .post(testCtrl.addTest)


module.exports = router;
