'use strict';

const express = require('express');
const { validate } = require('express-validation');

import { getUserByIp } from './controller/user';
import { getCurrentMarketRate } from './controller/rate';

import { postUserGuess, resolveUserGuess, getUnresolvedGuessCount } from './controller/guess';
import { getPostValidator, getReolveValidator, getUnReolvedValidator } from './controller/guess/validate';

const router = express.Router();

router.get('/user', getUserByIp);
router.get('/rate', getCurrentMarketRate);
router.post('/guess', validate(getPostValidator), postUserGuess);
router.post('/guess/resolve', validate(getReolveValidator), resolveUserGuess);
router.get('/guess/unResolved', validate(getUnReolvedValidator), getUnresolvedGuessCount);

module.exports = {
    router
};
