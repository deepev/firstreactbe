import fileService from '../services/file';
import { catchAsync } from "../helpers/catchAsync";

const addImage = catchAsync(async (req, res) => {
    const result = await fileService.addImage(req);
    res.message = _localize('module.create', req, 'File');
    return util.successResponse(result, res);
});

const getFile = catchAsync(async (req, res) => {
    const result = await fileService.getFile(req);
    res.message = _localize('module.get', req, 'File');
    return util.successResponse(result, res);
});

const getAll = catchAsync(async (req, res) => {
    const result = await fileService.getAll(req);
    if (!result) {
        return res.status(404).json({ message: 'Files not Found', data: []});
    }
    res.message = _localize('module.list', req, 'File');
    return util.successResponse(result, res);
});

const deleteFile = catchAsync(async (req, res) => {
    await fileService.deleteFile(req);
    return res.status(200).json({ message: 'File deleted successfully', data: {}});
});

export default {
    addImage,
    getFile,
    getAll,
    deleteFile
}