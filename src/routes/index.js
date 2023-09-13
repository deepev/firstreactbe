import { Router } from "express";
import user from './user';
import file from './file';

const router = Router();

router.use('/user', user);
router.use('/file', file);

export default router;