import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import idValidator from 'mongoose-id-validator';
import { PAGINATION_LABEL } from '../config/constants/common';

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

export default file;
