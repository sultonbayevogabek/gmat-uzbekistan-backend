import config from '../config.js'
import { User } from '../models/models.js'
import { generateHash } from '../services/bcrypt.service.js'
import { generateToken } from '../services/jwt.service.js'
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

export default async (req, res) => {
   const ticket = await client.verifyIdToken({
      idToken : req.body.idToken,
      audience : config.GOOGLE_CLIENT_ID
   });

   if (!ticket) {
      return res.status(400).send({
         ok: false,
         error: 'Google authentication failed'
      })
   }

   const { envelope: { kid }, payload: { email, name, picture } } = ticket
   const [ user, created ] = await User.findOrCreate({
      where: { googleId: kid },
      defaults: {
         googleId: kid,
         name,
         email,
         avatar: picture
      }
   })

   if (!created && user?.isDeleted) {
      return res.status(400).send({
         ok: false,
         error: 'User has been blocked by system'
      })
   }

   delete user?.dataValues?.password

   return res.status(200).send({
      ok: true,
      user,
      token: generateToken({ userId: user?.id }),
      message: 'Google auth was successfully performed'
   })
}
