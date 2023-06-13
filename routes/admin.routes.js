import { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware.js';
import AdminMiddleware from '../middlewares/admin.middleware.js';
import { AdminController } from '../controllers/admin.controller.js';
import DeleteScreenshotValidator from '../validators/delete-screenshot.validator.js';

const router = Router();
const { getAllUsers, deleteUser, changeRole, setScreenshotAsSeen } = new AdminController();

router.post('/get-users', AuthMiddleware, AdminMiddleware, getAllUsers);

router.post('/delete-user', AuthMiddleware, AdminMiddleware, deleteUser);

router.post('/change-role', AuthMiddleware, AdminMiddleware, changeRole);

router.post('/set-screenshot-as-seen', AuthMiddleware, AdminMiddleware, DeleteScreenshotValidator, setScreenshotAsSeen);

export default { route: '/', router };
