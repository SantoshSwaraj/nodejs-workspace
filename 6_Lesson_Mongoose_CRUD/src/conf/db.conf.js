//DB Level Configuration File
'use strict';

const PORT = 27017;
const HOST = '127.0.0.1';
const USERNAME = 'root';
const PASSWORD = 'root';
const MY_DB = 'test';
const AUTH_DB = 'admin';

// const DBURL = `mongodb://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/admin`;

const DBURL = `mongodb://${HOST}:${PORT}/${MY_DB}`;

module.exports = {
    PORT:PORT,
    HOST:HOST,
    USERNAME:USERNAME,
    PASSWORD:PASSWORD,
    DBURL:DBURL,
    AUTH_DB:AUTH_DB
}