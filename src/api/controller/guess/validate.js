'use strict';

const { Joi } = require('express-validation');

export const getPostValidator = {
    body: Joi.object({
        userId: Joi.number().integer().required(),
        guess: Joi.string().required()
    })
};

const validationObj = Joi.object({
    userId: Joi.number().integer().required()
});

export const getUnReolvedValidator = {
    query: validationObj
};

export const getReolveValidator = {
    body: validationObj
};
