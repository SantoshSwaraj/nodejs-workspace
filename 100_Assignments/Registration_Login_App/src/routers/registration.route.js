'use strict';

const router = require('express').Router();
const registrationCtrl = require('../controllers/registration.controller');

router
    .route('/users')
    .post(registrationCtrl.addUser)
    .get(registrationCtrl.getUsers)

router
    .route('/users/:userId')
    .get(registrationCtrl.getUser)
    .put(registrationCtrl.updateUser)
    .delete(registrationCtrl.deleteUser)

module.exports = router;