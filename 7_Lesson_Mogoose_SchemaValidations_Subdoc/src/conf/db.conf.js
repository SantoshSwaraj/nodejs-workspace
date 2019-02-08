'use strict';

const HOSTNAME = '127.0.0.1';
const PORT = 27017;
const USERNAME = 'root';
const PASSWORD = 'root';
const MY_DB = 'test';
const AUTH_DB = 'admin';

const DBURL =  `mongodb://${HOSTNAME}:${PORT}/${MY_DB}`;

module.exports = {
    DBURL:DBURL,
    USERNAME:USERNAME,
    PASSWORD:PASSWORD,
    AUTH_DB:AUTH_DB
}

