'use strict';

const router = require('express').Router();
const loginCtrl = require('../controllers/login.controller');

router
    .route('/login')
    .post(loginCtrl.checkLogin)

module.exports = router;