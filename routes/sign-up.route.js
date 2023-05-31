import { Router } from 'express'
import SignUpController from '../controllers/sign-up.controller.js';

const router = Router()
router.post('/', SignUpController)

export default { route: '/sign-up', router }
