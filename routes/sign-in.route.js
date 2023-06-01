import {Router} from 'express'
import SignInController from '../controllers/sign-in.controller.js';
import SignInValidator from '../validators/sign-in.validator.js';

const router = Router()
router.post('/', SignInValidator, SignInController)

export default {route: '/sign-in', router}