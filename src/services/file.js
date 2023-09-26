import File from '../models/userFile';
import dbService from '../helpers/dbService';

const addImage = async (req) => {
    try {
        /**
         * single file upload
         */
        // const data = {
        //     name: req.body.fileName,
        //     created_by: req.user._id,
        //     originalname: req.file.originalname,
        //     fileName: req.file.fileName
        // }
        // return File.create(data);

        /**
         * multiple file upload
         */
        const bulkFiles = [];
        for (const fileData of req.files) {
            bulkFiles.push({
                insertOne : {
                    document: {
                        path: fileData.path,
                        created_by: req.user._id,
                        originalName: fileData.originalname,
                        fileName: fileData.filename,
                        fileType: fileData.filename.split('.').pop()    
                    }
                }
            })
        }
        return File.bulkWrite(bulkFiles);
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
        let query = {}, options = {};
        if (req.body.options) {
            options = {
                ...req.body.options
            }
        }
        if (req.body.query) {
            query = {
                ...req.body.query
            }
        }
        return dbService.getAllDocuments(File, query, options);   
        // return getAllDocuments(File, req.body?.query || {} , req.body?.options || {})
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

const allFiles = async (req) => {
    try {
        
        return File.aggregate([
            {
                $group: {
                    _id: '$fileType',
                    mostCommon: {
                        $push: {
                            originalName: '$originalName',
                            fileType: '$fileType'
                        }
                    },
                    total: { $sum: 1 }
                }
            },
            {
                $sort: { total: -1 }
            },
            {
                $project: {
                    types: {
                        $slice: ['$mostCommon.fileType', 5]
                    },
                    total: 1
                }
            },
            { $unwind: "$types" },
            {
                $group: { _id: null, types: { $addToSet: { name: '$types', total: '$total' } }, }
            },
            {
                $project:
                {
                    _id: 0,
                    types:
                    {
                        $sortArray: { input: '$types', sortBy: { total: -1 } }
                    },
                }
            }
        ]);
    } catch (error) {
        console.log('error: ', error);
        
    }
}

export default {
    addImage,
    getAll,
    getFile,
    deleteFile,
    allFiles
}