import { Router } from "express";
import userController from '../controller/userController';
import validate from "../middlewares/validate";
import { createSchemaKeys, loginSchemaKeys } from '../helpers/validations/user';
import authentication from "../middlewares/authetication";

const router = Router();

router.post('/register', validate(createSchemaKeys), userController.addUser);
router.post('/login', validate(loginSchemaKeys), userController.loginUser);
router.get('/list', authentication, userController.getAll);
router.get('/token', userController.getToken);

export default router;