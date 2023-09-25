import todoService from '../services/todo';
import { catchAsync } from '../helpers/catchAsync';

const addTodo = catchAsync(async (req, res) => {
    const result = todoService.addTodo(req.body);
    if (result) {
        res.message = _localize('module.create', req, 'Todo');
        return util.successResponse(result, res);
    } 
    return util.failureResponse(_localize('module.createError', req, 'Todo'), res);
});

const getTodo = catchAsync(async (req, res) => {
    const result = todoService.getTodo(req.params.id);
    if (result) {
        res.message = _localize('module.get', req, 'Todo');
        return util.successResponse(result, res);
    } 
    return util.failureResponse( _localize('module.getError', req, 'Todo'), res);
});

const getAll = catchAsync(async (req, res) => {
    const result = todoService.getAll();

    if (result.length) {
        res.message = _localize('module.list', req, 'Todo');
        return util.successResponse(result, res);
    } 
    return util.failureResponse(_localize('module.listError', req, 'Todo'), res);
});

const deleteTodo = catchAsync(async (req, res) => {
    const result = todoService.deleteTodo(req.params.id);

    if (result) {
        res.message = _localize('module.delete', req, 'Todo');
        return util.successResponse(result, res);
    } 
    return util.failureResponse(_localize('module.deleteError', req, 'Todo'), res);
});

export default {
    addTodo,
    getTodo,
    getAll,
    deleteTodo
}