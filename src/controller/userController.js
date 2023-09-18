import { catchAsync } from "../helpers/catchAsync";
import userService from '../services/user';

const addUser = catchAsync(async (req, res) => {
    const result = await userService.addUser(req);
    const messageKey = result 
        ? _localize('module.create', req, 'User')
        : _localize('module.createError', req, 'User');
    const responseFunc = result ? util.successResponse : util.failureResponse
    res.message = messageKey
    return responseFunc(result || {}, res);
});

const loginUser = catchAsync(async (req, res) => {
    const result = await userService.loginUser(req, res);
    const messageKey = result 
        ? _localize('auth.loginSucess', req)
        : _localize('auth.loginError', req);

    const responseFunc = result ? util.successResponse : util.loginFailed
    res.message = messageKey
    return responseFunc(result || {}, res);
});

const getAll = catchAsync(async (req, res) => {
    const result = await userService.getAll(req);
    const messageKey = result.length 
        ? _localize('module.list', req, 'User')
        : _localize('module.listError', req, 'User');

    const responseFunc = result ? util.successResponse : util.recordNotFound
    res.message = messageKey
    return responseFunc(result || [], res);
});

const getToken = catchAsync(async (req, res) => {
    const result = await userService.refreshToken(req, res);
    res.message = _localize('module.list', req, 'User');
    return util.successResponse(result, res);
});

export default {
    addUser,
    loginUser,
    getAll,
    getToken
}