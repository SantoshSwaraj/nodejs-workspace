'use strict';

const router = require('express').Router();
const loginCtrl = require('../controllers/login.controller');

router
    .route('/login')
    .get(loginCtrl.getLogin)

module.exports = router;