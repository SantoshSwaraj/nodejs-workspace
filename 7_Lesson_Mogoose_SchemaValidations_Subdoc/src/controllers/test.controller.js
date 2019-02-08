'use strict';

const mongoose = require('mongoose');
const Test = require('../models/test.model');

module.exports.addTest = (req, res, next) => {
    var m = new Test;
    m.name = 'Statue of Liberty';
    m.age = 60;
    m.updated = new Date;
    m.binary = new Buffer(0);
    m.living = false;
    m.mixed = { any: { thing: 'i want' } };
    m.markModified('mixed');
    m._someId = new mongoose.Types.ObjectId;
    m.array.push(1);
    m.ofString.push("strings!");
    m.ofNumber.unshift(1, 2, 3, 4);
    m.ofDates.addToSet(new Date);
    m.ofBuffer.pop();
    m.ofMixed = [1, [], 'three', { four: 5 }];
    m.nested.stuff = 'good';
    m.save()
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(error=>{
            res.status(500).json(error);
        })


} 