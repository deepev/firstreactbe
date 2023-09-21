import { Router } from "express";
import user from './user';
import file from './file';
import todo from './todo';

const router = Router();

router.use('/user', user);
router.use('/file', file);
router.use('/todos', todo)

export default router;