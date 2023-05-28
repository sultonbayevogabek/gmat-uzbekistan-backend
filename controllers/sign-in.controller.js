const signInValidation = require('../validations/signin-validation')
const { generateToken } = require('../modules/jwt')
const { compareHash } = require('../modules/bcrypt')

const signInController = async (req, res) => {
   try {
      const { email, password } = await signInValidation.validateAsync(req.body)

      const candidate = await req.db.users.findOne({
         where: { email }
      })

      if (!candidate) {
         throw new Error('This email address is not registered. Please register')
      }

      const isPasswordCorrect = await compareHash(password, candidate.password)

      if (!isPasswordCorrect) {
         throw new Error('Password entered incorrectly')
      }

      res.cookie('token', generateToken({ email })).status(200).send({
         ok: true,
         message: 'successfully logged in'
      })
   } catch (e) {
      res.status(400).send({
         ok: false,
         message: e + ''
      })
   }
}

module.exports = { authGetController, signUpController, signInController }