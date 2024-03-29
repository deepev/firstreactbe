const multer = require('multer');

const maxSize = 2 * 1024 * 1024;

const userprofile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const userupload = multer({ storage: userprofile, limits: { fileSize: maxSize } });

module.exports = userupload;
