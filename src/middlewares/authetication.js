import jwt from 'jsonwebtoken';
import config from '../config/config';

// create function for verify token
const authentication = (req, res, next) => {
    const token = req.header('authorization');

    if (!token) return res.status(400).send({ message: _localize('auth.userNotAllowed', req) });

    try {
        //   checking for valid token
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).send({ message: _localize('auth.userNotAllowed', req) });
            } else {
                req.user = decoded;
                next();
            }
        })
    } catch (error) {
        console.log(error);
    }
};

export default authentication;
