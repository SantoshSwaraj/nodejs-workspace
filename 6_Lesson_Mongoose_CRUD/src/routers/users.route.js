'use strict';

const router = require('express').Router();
const userCtrl = require('../controllers/users.controller');

router
    .route('/signup')
    .post(userCtrl.createUser)

router
    .route('/login')
    .post(userCtrl.loginUser)

router
    .route('/:userId')
    .delete(userCtrl.deleteUser)

module.exports = router;
    