import { User } from '../models/models.js'
import { generateHash } from '../services/bcrypt.service.js'
import { generateToken } from '../services/jwt.service.js'

export default async (req, res) => {
   let { name, phone, password } = req.body

   let [user, created] = await User.findOrCreate({
      where: { phone },
      defaults: {
         name,
         phone,
         password: await generateHash(password)
      }
   })

   if (!created) {
      let error;

      if (user?.isDeleted) {
         error = 'User has been blocked by system'
      }

      if (!user?.isDeleted) {
         errors.push('The phone number has already been registered')
      }

      return res.status(400).send({
         ok: false,
         errors
      })
   }

   delete user?.dataValues?.password

   return res.status(200).send({
      ok: true,
      message: `New user was created successfully`,
      user,
      token: generateToken({ id: user.id })
   })
}
