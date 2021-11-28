'use strict';

const express = require('express');
const { validate } = require('express-validation');

import { getUserByIp } from './controller/user';
import { getCurrentMarketRate } from './controller/rate';

const router = express.Router();

router.get('/user', getUserByIp);
router.get('/rate', getCurrentMarketRate);

module.exports = {
    router
};
