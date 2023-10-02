const userService = require('../services/user');

const addUser = catchAsync(async (req, res) => {
    const result = await userService.addUser(req);
    if (result) {
        res.message = _localize('module.create', req, 'User');
        return util.createdDocumentResponse(result, res);
    }
    return util.failureResponse(_localize('module.createError', req, 'User'), res);
});

const loginUser = catchAsync(async (req, res) => {
    const result = await userService.loginUser(req, res);
    if (result) {
        res.message = _localize('auth.loginSucess', req)
        return util.successResponse(result, res);
    }
    return util.failureResponse(_localize('auth.loginError', req), res);
});

const getAll = catchAsync(async (req, res) => {
    const result = await userService.getAll(req);
    if (result.length) {
        res.message = _localize('module.list', req, 'User');
        return util.successResponse(result, res);
    }
    return util.failureResponse(_localize('module.listError', req, 'User'), res);
});

const getToken = catchAsync(async (req, res) => {
    const result = await userService.refreshToken(req, res);
    res.message = _localize('module.list', req, 'User');
    return util.successResponse(result, res);
});

module.exports = {
    addUser,
    loginUser,
    getAll,
    getToken
}