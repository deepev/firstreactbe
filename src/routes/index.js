const { Router } = require('express');
const user = require('./user');
const file = require('./file');
const todo = require('./todo');

const router = Router();

router.use('/user', user);
router.use('/file', file);
router.use('/todos', todo);

module.exports = router;
