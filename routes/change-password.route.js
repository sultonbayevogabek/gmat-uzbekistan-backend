import { Router } from 'express';
import ChangePasswordController from '../controllers/change-password.controller.js';
import ChangePasswordValidator from '../validators/change-password.validator.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';

const router = Router();
router.post('/', AuthMiddleware, ChangePasswordValidator, ChangePasswordController);

export default { route: '/change-password', router };
