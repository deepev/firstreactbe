const joi = require('joi');

const createSchemaKeys = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
}).unknown(false);

const loginSchemaKeys = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
}).unknown(false);

module.exports = {
    createSchemaKeys,
    loginSchemaKeys
}
