'use strict';

const routers = require('express').Router();
const empCtrl = require('../controllers/employees.controller');

routers
    .route('/employees')
    .get(empCtrl.getEmployees);

routers
    .route('/employee/:id')
    .get(empCtrl.getEmployee);

module.exports = routers;