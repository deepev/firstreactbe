import fileService from '../services/file';
import { catchAsync } from "../helpers/catchAsync";

const addImage = catchAsync(async (req, res) => {
    const result = await fileService.addImage(req);
    const messageKey = result 
        ? _localize('module.create', req, 'File')
        : _localize('module.createError', req, 'File')
    const responseFunc = result ? util.successResponse : util.failureResponse

    res.message = messageKey
    return responseFunc(result || {}, res);
});

const getFile = catchAsync(async (req, res) => {
    const result = await fileService.getFile(req);
    const messageKey = result 
        ? _localize('module.get', req, 'File')
        : _localize('module.getError', req, 'File')
    const responseFunc = result ? util.successResponse : util.failureResponse

    res.message = messageKey
    return responseFunc(result || {}, res);
});

const getAll = catchAsync(async (req, res) => {
    const result = await fileService.getAll(req);
    const messageKey = result.length 
        ? _localize('module.list', req, 'Files')
        : _localize('module.listError', req, 'Files')
    const responseFunc = result ? util.successResponse : util.recordNotFound

    res.message = messageKey
    return responseFunc(result || [], res);
});

const deleteFile = catchAsync(async (req, res) => {
    const result = await fileService.deleteFile(req);
    const messageKey = result 
        ? _localize('module.delete', req, 'File')
        : _localize('module.deleteError', req, 'File')
    const responseFunc = result ? util.successResponse : util.failureResponse

    res.message = messageKey
    return responseFunc({}, res);
});

export default {
    addImage,
    getFile,
    getAll,
    deleteFile
}