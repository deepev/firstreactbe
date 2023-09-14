import { Router } from 'express';
import fileController from '../controller/fileController';
import validate from '../middlewares/validate';
import { userupload } from '../middlewares/multer';
import authentication from '../middlewares/authetication';

const router = Router();

router.post(
    '/create',
    authentication,
    userupload.single('file'),
    fileController.addImage,
);
router.get('/list', authentication, fileController.getAll);
router.get('/get/:id', authentication, fileController.getFile);
router.delete('/get/:id', authentication, fileController.deleteFile);

export default router;
