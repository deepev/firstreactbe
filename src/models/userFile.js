import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        path: {
            type: String,
        },
        created_by: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
        },
        originalName: { type: String },
        fileName: { type: String }
    },
    {
        timestamps: true,
    },
);

const file = mongoose.model('file', schema);

export default file;
