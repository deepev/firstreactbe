const { Router } = require('express');
const todoController = require('../controller/todoController');

const router = Router();

router.get('/list', todoController.getAll);

router.post('/create', todoController.addTodo);

router.get('/:id', todoController.getTodo);

router.delete('/:id', todoController.deleteTodo);

module.exports = router;