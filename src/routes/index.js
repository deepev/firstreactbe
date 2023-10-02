const { Router } = require('express');

const router = Router();

router.use('/user', require('./user'));
router.use('/file', require('./file'));
router.use('/todos', require('./todo'));

module.exports = router;
