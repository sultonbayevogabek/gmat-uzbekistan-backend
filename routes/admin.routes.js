import { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware.js';
import AdminMiddleware from '../middlewares/admin.middleware.js';
import { AdminController } from '../controllers/admin.controller.js';
import IdValidator from '../validators/id.validator.js';
import fileUpload from 'express-fileupload';
import CreateLessonValidator from '../validators/create-lesson.validator.js';
import UpdateLessonValidator from '../validators/update-lesson.validator.js';

const router = Router();
const {
    getAllUsers,
    deleteUser,
    changeRole,
    setScreenshotAsSeen,
    createLesson,
    updateLesson,
    deleteLesson
} = new AdminController();

router.post('/get-users', AuthMiddleware, AdminMiddleware, getAllUsers);

router.post('/delete-user', AuthMiddleware, AdminMiddleware, deleteUser);

router.post('/change-role', AuthMiddleware, AdminMiddleware, changeRole);

router.post('/set-screenshot-as-seen', AuthMiddleware, AdminMiddleware, IdValidator, setScreenshotAsSeen);

router.post('/create-lesson', AuthMiddleware, AdminMiddleware, fileUpload(), CreateLessonValidator, createLesson);

router.post('/update-lesson', AuthMiddleware, AdminMiddleware, fileUpload(), UpdateLessonValidator, updateLesson);

router.post('/delete-lesson', AuthMiddleware, AdminMiddleware, IdValidator, deleteLesson);

export default { route: '/', router };
