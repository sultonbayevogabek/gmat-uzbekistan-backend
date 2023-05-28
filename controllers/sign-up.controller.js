const path = require('path')
const signUpValidation = require('../validations/signup-validation')
const signInValidation = require('../validations/signin-validation')
const { generateToken } = require('../modules/jwt')
const { generateHash, compareHash } = require('../modules/bcrypt')

const signUpController = async (req, res) => {
   try {
      const { name, phone, password } = await signUpValidation.validateAsync(req.body)
      const candidate = await req.db.users.findOne({
         where: { email }
      })
      if (candidate) {
         throw new Error('This was previously registered via email. Please login')
      }
      const avatar = req.files.avatar
      await avatar.mv(
         path.join(
            __dirname,
            '..',
            'public',
            'img',
            'users',
            `${avatar.md5}.${avatar.mimetype.split('/')[1]}`
         ),
         (err) => {}
      )
      const user = await req.db.users.create({
         firstName,
         lastName,
         email,
         password: await generateHash(password),
         avatar: `img/users/${avatar.md5}.${avatar.mimetype.split('/')[1]}`
      })
      res.cookie('token', generateToken({ email }))
      res.status(200).send({
         ok: true,
         result: { user }
      })
   } catch (e) {
      res.status(400).send({
         ok: false,
         message: e + ''
      })
   }
}

module.exports = { authGetController, signUpController, signInController }