import { Router } from 'express';
import SignInValidator from '../validators/sign-in.validator.js';
import SignUpValidator from '../validators/sign-up.validator.js';
import GoogleAuthValidator from '../validators/google-auth.validator.js';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();
const { signIn, signUp, googleAuth } = new AuthController();

router.post('/sign-in', SignInValidator, signIn);

router.post('/sign-up', SignUpValidator, signUp);

router.post('/google-auth', GoogleAuthValidator, googleAuth)

export default { route: '/', router };
