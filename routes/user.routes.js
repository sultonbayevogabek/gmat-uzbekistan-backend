import { Router } from 'express';
import ChangePasswordValidator from '../validators/change-password.validator.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';
import { UserController } from '../controllers/user.controller.js';

const router = Router();
const { getUser, changePassword } = new UserController();

router.post('/change-password', AuthMiddleware, ChangePasswordValidator, changePassword);

router.post('/get-user', AuthMiddleware, getUser);

export default { route: '/', router };
