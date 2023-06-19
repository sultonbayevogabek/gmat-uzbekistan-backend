import { Router } from 'express';
import fileUpload from 'express-fileupload';
import ChangePasswordValidator from '../validators/change-password.validator.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';
import { UserController } from '../controllers/user.controller.js';
import UpdateCredentialsValidator from '../validators/update-credentials.validator.js';
import IdValidator from '../validators/id.validator.js';

const router = Router();
const {
    getUser, changePassword, updateCredentials,
    uploadAvatar, uploadScreenshot, deleteScreenshot, getScreenshots,
    getLessons,
    incrementViewsCount
} = new UserController();

router.post('/change-password', AuthMiddleware, ChangePasswordValidator, changePassword);

router.post('/update-credentials', AuthMiddleware, UpdateCredentialsValidator, updateCredentials);

router.post('/upload-avatar', AuthMiddleware, fileUpload(), uploadAvatar);

router.post('/upload-screenshot', AuthMiddleware, fileUpload(), uploadScreenshot);

router.post('/delete-screenshot', AuthMiddleware, IdValidator, deleteScreenshot);

router.post('/get-screenshots', AuthMiddleware, getScreenshots);

router.post('/get-user', AuthMiddleware, getUser);

router.post('/get-lessons', AuthMiddleware, getLessons);

router.post('/increment-views-count', AuthMiddleware, IdValidator, incrementViewsCount);

export default { route: '/', router };
