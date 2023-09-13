import multer from 'multer';
import path from 'path';

const userprofile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});

export const userupload = multer({ storage: userprofile });
