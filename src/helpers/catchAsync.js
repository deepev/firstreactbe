const { RESPONSE_CODE } = require('../config/common');
const { validationError } = require('./responseCode');

const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        res.status(validationError).json({
            code: RESPONSE_CODE.ERROR,
            message: _localize(err.message, req),
        });
    });
};

module.exports = catchAsync;
