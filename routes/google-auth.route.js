import { Router } from 'express'
import GoogleAuthController from "../controllers/google-auth.controller.js";

const router = Router()
router.post('/', GoogleAuthController)

export default { route: '/google-auth', router }
