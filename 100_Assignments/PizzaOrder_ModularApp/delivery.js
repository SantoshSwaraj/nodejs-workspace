"use strict";
let pizza_module = require('./pizzas');
let order_module = require('./order');

let scheduleDelivery = [];

module.exports.deliverOrders=()=>{
    for(let order of order_module.orders){
        let totalOrderPreprapeTimeInMintues = 0;
        for(let pizzaId of order.pizzaIds){
            totalOrderPreprapeTimeInMintues += pizza_module.getPrepareTimeById(pizzaId);
        }
        scheduleDelivery.push({
           "orderId": order.orderId,
           "totalOrderPreprapeTimeInMintues":totalOrderPreprapeTimeInMintues
        })
    }
    console.log(scheduleDelivery);
}



