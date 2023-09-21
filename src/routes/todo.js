import { Router } from 'express';
import todoController from '../controller/todoController';

const router = Router();

router.get('/list', todoController.getAll);

router.post('/create', todoController.addTodo);

router.get('/:id', todoController.getTodo);

router.delete('/:id', todoController.deleteTodo);

export default router;