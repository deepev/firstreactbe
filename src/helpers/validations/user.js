import joi from 'joi';

export const createSchemaKeys = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
}).unknown(false);

export const loginSchemaKeys = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
}).unknown(false);

