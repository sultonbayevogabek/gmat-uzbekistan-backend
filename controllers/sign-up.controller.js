import { User } from '../models/models.js'
import { generateHash } from '../services/bcrypt.service.js'
import { generateToken } from '../services/jwt.service.js'

export default async (req, res) => {
   let { name, phone, password } = req.body

   name = name?.trim()
   phone = phone?.trim()

   const errors = []

   if (!name) {
      errors.push('Name is required')
   }

   if (name?.length < 3 || name?.length > 32) {
      errors.push('Invalid name')
   }

   if (!phone) {
      errors.push('Phone number is required')
   }

   if (!/^\+998[0-9]{9}$/.test(phone)) {
      errors.push('Invalid phone number')
   }

   if (!password) {
      errors.push('Password is required')
   }

   if (password?.length < 6 || password?.length > 32) {
      errors.push('Invalid password')
   }

   if (errors.length) {
      return res.status(400).send({
         ok: false,
         errors
      })
   }

   let [user, created] = await User.findOrCreate({
      where: { phone },
      defaults: {
         name,
         phone,
         password: await generateHash(password)
      }
   })

   if (!created) {
      let errors = []

      if (user?.isDeleted) {
         errors.push('User has been blocked by system')
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
