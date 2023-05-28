const router = require('express').Router()
const fileUpload = require('express-fileupload')
const { authGetController, signUpController, signInController } = require('../controllers/sign-up.controller')

const { dontEnterAuthorized } = require('../middlewares/auth.middleware')

router.get('/', dontEnterAuthorized, authGetController)

router.post('/sign-up', fileUpload(), signUpController)

router.post('/sign-in', signInController)

module.exports = {
    router,
    route: '/auth'
}