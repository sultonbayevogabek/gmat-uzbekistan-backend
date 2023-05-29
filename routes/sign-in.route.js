import { Router } from 'express'
import SignInController from '../controllers/sign-in.controller.js';

const router = Router()
router.post('/', SignInController)

export default { route: '/sign-in', router }