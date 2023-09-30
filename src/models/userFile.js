const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const idValidator = require('mongoose-id-validator');
const { PAGINATION_LABEL } = require('../config/constants/common');

mongoosePaginate.paginate.options = { customLabels: PAGINATION_LABEL };

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        path: {
            type: String,
        },
        created_by: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        originalName: { type: String },
        fileName: { type: String },
        fileType: { type: String }
    },
    {
        timestamps: true,
    },
);

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const file = mongoose.model('file', schema);

module.exports = file;
