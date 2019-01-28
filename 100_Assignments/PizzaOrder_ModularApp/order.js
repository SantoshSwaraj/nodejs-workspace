"use strict";
let user_module = require('./users');
let pizza_module = require('./pizzas');

let orders = [];

let unqineOrderIdGen=()=>{
    let date = new Date();
    let components = [
        date.getYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ];
    return components.join("");
}

class Order{
    constructor(userId, pizzaIds){
        this.orderId = unqineOrderIdGen();
        this.userId = userId;
        this.pizzaIds = pizzaIds;
    }
}

function takeOrder(userId, pizzaIds){
    if(user_module.getUserById(userId) == null){
        return -1;
    }
    for(let pizzaId of pizzaIds){
        if(pizza_module.getPizzaById(pizzaId) == null){
            return -1;
        }
    }
    let order = new Order(userId, pizzaIds);
    orders.push(order);
    return 1;
}

module.exports = {
    orders:orders,
    takeOrder:takeOrder
}