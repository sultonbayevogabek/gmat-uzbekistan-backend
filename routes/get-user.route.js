import { Router } from 'express'
import GetUserController from '../controllers/get-user.controller.js'
import AuthMiddleware from '../middlewares/auth.middleware.js'

const router = Router()
router.post('/', AuthMiddleware, GetUserController)

export default { route: '/get-user', router }
