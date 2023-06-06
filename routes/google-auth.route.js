import { Router } from 'express';
import GoogleAuthController from '../controllers/google-auth.controller.js';
import GoogleAuthValidator from '../validators/google-auth.validator.js';

const router = Router();
router.post('/', GoogleAuthValidator, GoogleAuthController);

export default { route: '/google-auth', router };
