'use strict';

const express = require('express');
const { validate } = require('express-validation');

import { getCurrentMarketRate } from './controller/rate';

const router = express.Router();

router.get('/rate', getCurrentMarketRate);

module.exports = {
    router
};
