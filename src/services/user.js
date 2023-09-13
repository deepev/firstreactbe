import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const secreteKey = config.JWT_SECRET;

const addUser = async (req) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            throw new Error(_localize('module.alreadyExists', req, 'User'));
        }
        return User.create(req.body);
    } catch (error) {
        console.error('error: ', error);
        throw new Error(error.message);
    }
}

const loginUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (!existingUser) {
            throw new Error(_localize('module.accountNotFound', req, 'Email'));
        }
        const checkPassword = await existingUser.comparePassword(req.body.password);

        if (!checkPassword) {
            throw new Error(_localize('module.notMatched', req, 'Password'));
        }
        const token = jwt.sign({
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email
        }, secreteKey, { expiresIn: '1h' });

        const refreshToken = jwt.sign(
            {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
            },
            secreteKey,
            {
                expiresIn: '1d',
            },
        );
        await User.updateOne({ _id: existingUser._id },{ $set: { refreshToken: refreshToken} });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        const response = {
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            token: token
        }
        return response;
    } catch (error) {
        console.error('error: ', error);
        throw new Error(error.message);
    }
}

const getAll = async (req) => {
    try {
        const result = await User.find({});
        if (!result) {
            throw new Error(_localize('module.notFound', req, 'User'));
        }
        return result;
    } catch (error) {
        console.error('error: ', error);
        throw new Error(error.message);
    }
}

const refreshToken = async(req, res) => {
    try {
       
        const refreshToken = res.cookie.refreshToken;
        console.log('refreshToken: ', refreshToken);
        if(!refreshToken) {
            throw new Error('you are not allow to access');
        };
        const user = await User.find({ refreshToken: refreshToken });
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, secreteKey, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const accessToken = jwt.sign({userId, name, email}, secreteKey,{
                expiresIn: '15s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}


export default {
    addUser,
    loginUser,
    getAll,
    refreshToken
}