const { getFilterQuery } = require('../services/filterQuery');

/*
 * createDocument : create any mongoose document
 * @param  model  : mongoose model
 * @param  data   : {}
 */

const createDocument = (model, data) => {
    new Promise((resolve, reject) => {
        model.create(data, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

/*
 * updateDocument : update any existing mongoose document
 * @param  model  : mongoose model
 * @param id      : mongoose document's _id
 * @param data    : {}
 */

const updateDocument = (model, id, data) => {
    new Promise((resolve, reject) => {
        model.updateOne(
            { _id: id },
            data,
            { runValidators: true, context: 'query' },
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            },
        );
    });
};

/*
 * deleteDocument : delete any existing mongoose document
 * @param  model  : mongoose model
 * @param  id     : mongoose document's _id
 */

const deleteMultipleDocuments = (model, ids) => {
    new Promise((resolve, reject) => {
        model.deleteMany({ _id: { $in: ids } }, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

/*
 * getAllDocuments : find all the mongoose document
 * @param  model   : mongoose model
 * @param query    : {}
 * @param options  : {}
 */

const getAllDocuments = async (model, query, options) => {
    query = await getFilterQuery(query);
    return new Promise((resolve, reject) => {
        model.paginate(query, options, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};


module.exports = {
    createDocument,
    updateDocument,
    deleteMultipleDocuments,
    getAllDocuments
}