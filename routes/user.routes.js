import { Router } from 'express';
import ChangePasswordValidator from '../validators/change-password.validator.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';
import { UserController } from '../controllers/user.controller.js';
import UpdateCredentialsValidator from '../validators/update-credentials.validator.js';

const router = Router();
const { getUser, changePassword, updateCredentials } = new UserController();

router.post('/change-password', AuthMiddleware, ChangePasswordValidator, changePassword);

router.post('/update-credentials', AuthMiddleware, UpdateCredentialsValidator, updateCredentials);

router.post('/get-user', AuthMiddleware, getUser);

export default { route: '/', router };
