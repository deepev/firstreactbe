import fileService from '../services/file';
import { catchAsync } from "../helpers/catchAsync";

const addImage = catchAsync(async (req, res) => {
    const result = await fileService.addImage(req);
    if (result) {
        res.message = _localize('module.create', req, 'File');
        return util.successResponse(result, res);
    }
    return util.failureResponse(_localize('module.createError', req, 'File'), res);
});

const getFile = catchAsync(async (req, res) => {
    const result = await fileService.getFile(req);
    if (result) {
        res.message = _localize('module.get', req, 'File');
        return util.successResponse(result, res);
    }
    return util.failureResponse(_localize('module.getError', req, 'File'), res);
});

const getAll = catchAsync(async (req, res) => {
    const result = await fileService.getAll(req);
    if (result.data.length) {
        res.message = _localize('module.list', req, 'Files');
        return util.successResponse(result, res);
    }
    return util.failureResponse(_localize('module.listError', req, 'Files'), res);
});

const deleteFile = catchAsync(async (req, res) => {
    const result = await fileService.deleteFile(req);
    if (result) {
        res.message = _localize('module.delete', req, 'File');
        return util.successResponse({}, res);
    }
    return util.failureResponse(_localize('module.deleteError', req, 'File'), res);
});

const allFiles = catchAsync(async (req, res) => {
    const result = await fileService.allFiles(req);
    if (result) {
        res.message = _localize('module.list', req, 'File');
        return util.successResponse(result, res);
    }
    return util.failureResponse(_localize('module.listError', req, 'File'), res);
});

export default {
    addImage,
    getFile,
    getAll,
    deleteFile,
    allFiles
}