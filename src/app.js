'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { router } = require('./api/routes');

const getCors = {
    origin: '*',
    methods: '*'
};

const app = express();

app.use(cors(getCors));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router);

module.exports = app;
