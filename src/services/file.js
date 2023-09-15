import File from '../models/userFile';

const addImage = async (req) => {
    try {
        const data = {
            name: req.body.fileName,
            created_by: req.user._id,
            originalname: req.file.originalname,
            fileName: req.file.fileName
        }
        return File.create(data);
    } catch (error) {
        console.log('error: ', error); 
    }
}

const getFile = async (req) => {
    try {
        const result = await File.findOne({ _id: req.params.id });
        if (!result) {
            throw new Error(_localize('module.notFound', req, 'File'));
        }
        return result;
    } catch (error) {
        console.log('error: ', error); 
    }
}

const getAll = async (req) => {
    try {
        const result = await File.find({ created_by: req.user._id });
        if (!result) {
            throw new Error(_localize('module.notFound', req, 'Files'));           
        }
        return result;
    } catch (error) {
        console.log('error: ', error); 
    }
}

const deleteFile = async (req) => {
    try {
        return File.deleteOne({ _id: req.params.id });
    } catch (error) {
        console.log('error: ', error); 
        throw new Error(error.message);
    }
}

export default {
    addImage,
    getAll,
    getFile,
    deleteFile
}