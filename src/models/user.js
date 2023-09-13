import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const schema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        refreshToken: { 
            type: String
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
                delete ret.__v;
            },
        },
    },
    {
        timestamps: true,
    },
);

schema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (error, hash) => {
        if (error) {
            return next(error);
        } else {
            this.password = hash;
            next();
        }
    });
});

schema.methods.comparePassword = async function (passw) {
    return await bcrypt.compare(passw, this.password);
};

const user = model('user', schema);

export default user;
