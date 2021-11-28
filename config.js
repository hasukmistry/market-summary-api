'use strict';

const path = require('path');

require('dotenv').config();

const dbHost = process.env.DB_HOST ?? '';
const dbName = process.env.DB_NAME ?? '';
const dbUser = process.env.DB_USER ?? '';
const dbPass = process.env.DB_PASS ?? '';
const dbPort = process.env.DB_PORT ?? '';
const config = {};

module.exports = Object.assign(config, {
    username: dbUser,
    password: dbPass,
    database: dbName,
    host: dbHost,
    dialect: 'mysql',
    port: dbPort,
    define: {
        timestamps: true
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});