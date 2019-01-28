"use strict";
let pizzas = [
    {
        "pizzaId":100,
        "pizzaName":"Cheese Pizza",
        "price":200,
        "prepareTimeInMinutes":10
    },
    {
        "pizzaId":101,
        "pizzaName":"Chicken Pizza",
        "price":300,
        "prepareTimeInMinutes":15
    },
    {
        "pizzaId":102,
        "pizzaName":"Prawns Pizza",
        "price":400,
        "prepareTimeInMinutes":20
    },
    {
        "pizzaId":103,
        "pizzaName":"Onion Pizza",
        "price":500,
        "prepareTimeInMinutes":10
    },
    {
        "pizzaId":104,
        "pizzaName":"Mix Pizza",
        "price":600,
        "prepareTimeInMinutes":20
    },
    {
        "pizzaId":105,
        "pizzaName":"Hot Pizza",
        "price":700,
        "prepareTimeInMinutes":25
    },
    {
        "pizzaId":106,
        "pizzaName":"Full Pizza",
        "price":800,
        "prepareTimeInMinutes":30
    },
]


class Pizza{
    constructor(pizzaId,pizzaName,price,prepareTimeInMinutes){
        this.pizzaId = pizzaId;
        this.pizzaName = pizzaName;
        this.price = price;
        this.prepareTimeInMinutes = prepareTimeInMinutes;
    }
}

function getPizzaById(pizzaId){
    for(let pizza of pizzas){
        if(pizza.pizzaId == pizzaId){
            return pizza;
        }
    }
    return null;
}

let getPrepareTimeById=(pizzaId)=>getPizzaById(pizzaId).prepareTimeInMinutes;
    

function addPizza(pizza){
    if(getPizzaById(pizza.pizzaId) == null){
        pizzas.push(pizza);
        return 1;
    }
    return -1;
}

module.exports = {
    Pizza:Pizza,
    getPizzaById:getPizzaById,
    getPrepareTimeById:getPrepareTimeById,
    addPizza:addPizza
}
