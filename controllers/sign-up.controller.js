import { User } from '../models/models.js'

const SignUpController = async (req, res) => {
   let { name, phone, password } = req.body

   name = name?.trim()
   phone = phone?.trim()
   password = password?.trim()

   if (!name || name?.length < 3 || name?.length > 32) {
      return res.status(400).send({
         ok: false,
         message: `Ism uzunligi 3 ta belgidan kam va 32 ta belgidan ko'p bo'lmasligi kerak`
      })
   }

   if (!/^998([378]{2}|(9[013-57-9]))\d{7}$/.test(phone)) {
      return res.status(400).send({
         ok: false,
         message: `Telefon raqam formati noto'g'ri`
      })
   }

   if (!password || password?.length < 6 || password?.length > 32) {
      return res.status(400).send({
         ok: false,
         message: `Parol uzunligi 6 ta belgidan kam va 32 ta belgidan ko'p bo'lmasligi kerak`
      })
   }

   const user = await User.create({
      name, phone, password
   })

   return res.status(200).send({
      ok: true,
      message: `Yangi foydalanuvchi ro'yxatga olindi`
   })
}

export default SignUpController
