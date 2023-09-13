import { RESPONSE_CODE } from '../config/common';
const { validationError } = require('./responseCode');

export const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(err => {
        console.error(err);
        console.error(err.message);
        console.error(err.message);
        res.status(validationError).json({
            code: RESPONSE_CODE.ERROR,
            message: _localize(err.message, req),
        });
    })
}