import { RESPONSE_CODE } from '../config/common';
const { validationError } = require('./responseCode');

export const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(err => {
        res.status(validationError).json({
            code: RESPONSE_CODE.ERROR,
            message: _localize(err.message, req),
        });
    })
}