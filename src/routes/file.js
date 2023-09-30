const { Router } = require('express');
const fileController = require('../controller/fileController');
const validate = require('../middlewares/validate');
const userupload = require('../middlewares/multer');
const authentication = require('../middlewares/authetication');

const router = Router();

router.post(
    '/create',
    authentication,
    userupload.array('file'),
    fileController.addImage,
);
router.post('/list', authentication, fileController.getAll);
router.get('/get/:id', authentication, fileController.getFile);
router.delete('/get/:id', authentication, fileController.deleteFile);
router.get('/list', authentication, fileController.allFiles);

module.exports = router;
