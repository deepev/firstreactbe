import { catchAsync } from "../helpers/catchAsync";
import userService from '../services/user';

const addUser = catchAsync(async (req, res) => {
    const result = await userService.addUser(req);
    res.message = _localize('module.create', req, 'User');
    return util.successResponse(result, res);
});

const loginUser = catchAsync(async (req, res) => {
    const result = await userService.loginUser(req, res);
    res.message = _localize('module.loginSuccess', req, 'User');
    return util.successResponse(result, res);
});

const getAll = catchAsync(async (req, res) => {
    const result = await userService.getAll(req);
    res.message = _localize('module.list', req, 'User');
    return util.successResponse(result, res);
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