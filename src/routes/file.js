import { Router } from 'express';
import fileController from '../controller/fileController';
import validate from '../middlewares/validate';
import { userupload } from '../middlewares/multer';
import authentication from '../middlewares/authetication';

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
router.get('/list', fileController.allFiles);

export default router;
