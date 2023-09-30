const File = require('../models/userFile');
const dbService = require('../helpers/dbService');

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

        const bulkFiles = req.files.map((eachFile) => {
            return {
                insertOne: {
                    document: {
                        path: eachFile.path,
                        created_by: req.user._id,
                        originalName: eachFile.originalname,
                        fileName: eachFile.filename,
                        fileType: eachFile.filename.split('.').pop(),
                    },
                },
            };
        });

        return File.bulkWrite(bulkFiles);
    } catch (error) {
        console.log('error: ', error);
    }
};

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
};

const getAll = async (req) => {
    try {
        return dbService.getAllDocuments(
            File,
            req.body?.query || {},
            req.body?.options || {},
        );
    } catch (error) {
        console.log('error: ', error);
    }
};

const deleteFile = async (req) => {
    try {
        return File.deleteOne({ _id: req.params.id });
    } catch (error) {
        console.log('error: ', error);
        throw new Error(error.message);
    }
};

const allFiles = async (req) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        return File.aggregate([
            {
                $group: {
                    _id: '$fileType',
                    mostCommon: {
                        $push: {
                            originalName: '$originalName',
                            fileType: '$fileType',
                        },
                    },
                    total: { $sum: 1 },
                },
            },
            {
                $sort: { total: -1 },
            },
            {
                $limit: limit,
            },
            {
                $project: {
                    types: {
                        $slice: ['$mostCommon.fileType', 5],
                    },
                    total: 1,
                },
            },
            { $unwind: '$types' },
            {
                $group: {
                    _id: null,
                    types: { $addToSet: { name: '$types', total: '$total' } },
                },
            },
            {
                $project: {
                    _id: 0,
                    types: {
                        $sortArray: { input: '$types', sortBy: { total: -1 } },
                    },
                },
            },
        ]);
    } catch (error) {
        console.log('error: ', error);
    }
};

module.exports = {
    addImage,
    getAll,
    getFile,
    deleteFile,
    allFiles,
};
