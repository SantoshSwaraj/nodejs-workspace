'use strict';

const routers = require('express').Router();
const empCtrl = require('../controllers/employees.controller');

routers
    .route('/employees')
    .get(empCtrl.getEmployees)
    .post(empCtrl.insertEmployee);

routers
    .route('/employees/:id')
    .get(empCtrl.getEmployee)
    .put(empCtrl.updateEmployee)
    .delete(empCtrl.deleteEmployee);

module.exports = routers;