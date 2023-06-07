import { Router } from 'express';
import SignInValidator from '../validators/sign-in.validator.js';
import SignUpValidator from '../validators/sign-up.validator.js';
import GoogleAuthValidator from '../validators/google-auth.validator.js';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();
const authController = new AuthController();

router.post('/sign-in', SignInValidator, (req, res) => authController.signIn(req, res));

router.post('/sign-up', SignUpValidator, (req, res) => authController.signUp(req, res));

router.post('/google-auth', GoogleAuthValidator, (req, res) => authController.googleAuth(req, res));

export default { route: '/', router };

