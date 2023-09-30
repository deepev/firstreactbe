const { Router } = require('express');
const userController = require('../controller/userController');
const validate = require('../middlewares/validate');
const {
    createSchemaKeys,
    loginSchemaKeys,
} = require('../helpers/validations/user');
const authentication = require('../middlewares/authetication');

const router = Router();

router.post('/register', validate(createSchemaKeys), userController.addUser);
router.post('/login', validate(loginSchemaKeys), userController.loginUser);
router.get('/list', authentication, userController.getAll);
router.get('/token', userController.getToken);

module.exports = router;
