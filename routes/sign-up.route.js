import { Router } from 'express'
import SignUpController from '../controllers/sign-up.controller.js';
import SignUpValidator from "../validators/sign-up.validator.js";

const router = Router()
router.post('/', SignUpValidator, SignUpController)

export default { route: '/sign-up', router }
