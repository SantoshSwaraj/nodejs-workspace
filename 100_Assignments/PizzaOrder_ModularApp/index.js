"use strict";
let user_module = require('./users');
let register_module = require('./register');
let login_module = require('./login');
let pizza_module = require('./pizzas');
let order_module = require('./order');
let delivery_module = require('./delivery');

order_module.takeOrder(1000,[100,101,102]);
order_module.takeOrder(1001,[101,102,104]);
delivery_module.deliverOrders();
