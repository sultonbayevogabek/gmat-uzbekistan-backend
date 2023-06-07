import { User } from '../models/models.js';
import config from '../config.js';
import { OAuth2Client } from 'google-auth-library';
import { BcryptService } from './bcrypt.service.js';
import { JwtService } from './jwt.service.js';

const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);
const { generateHash, compareHash } = new BcryptService();
const { generateToken } = new JwtService();


export default class AuthService {
   async signUp(req, res) {
      let { name, phone, password } = req.body;

      let [user, created] = await User.findOrCreate({
         where: { phone }, defaults: {
            name, phone, password: await generateHash(password)
         }
      });

      if (!created) {
         let error;

         if (user?.isDeleted) {
            error = 'User has been blocked by system';
         }

         if (!user?.isDeleted) {
            error = 'The phone number has already been registered';
         }

         return res.status(400).send({
            ok: false, error
         });
      }

      delete user?.dataValues?.password;

      return res.status(200).send({
         ok: true, message: `New user was created successfully`, user, token: generateToken({ userId: user.id })
      });
   }

   async signIn(req, res) {
      let { phone, password } = req.body;

      const user = await User.findOne({
         where: {
            phone
         }
      });

      if (!user) {
         return res.status(404).send({
            ok: false, error: 'User not found'
         });
      }

      if (user) {
         if (user.isDeleted) {
            return res.status(400).send({
               ok: false, error: 'User has been blocked by system'
            });
         }

         const isPasswordCorrect = await compareHash(password, user?.password);
         if (!isPasswordCorrect) {
            return res.status(400).send({
               ok: false, error: 'Incorrect password'
            });
         }

         delete user?.dataValues?.password;

         return res.status(200).send({
            ok: true, message: `Login was successfully performed`, user, token: generateToken({ userId: user.id })
         });
      }
   }

   async googleAuth(req, res) {
      const ticket = await client.verifyIdToken({
         idToken: req.body.idToken, audience: config.GOOGLE_CLIENT_ID
      });

      if (!ticket) {
         return res.status(400).send({
            ok: false, error: 'Google authentication failed'
         });
      }

      const { payload: { email, name, picture } } = ticket;
      const [user, created] = await User.findOrCreate({
         where: { email }, defaults: {
            name, email, avatar: picture
         }
      });

      if (!created && user?.isDeleted) {
         return res.status(400).send({
            ok: false, error: 'User has been blocked by system'
         });
      }

      delete user?.dataValues?.password;

      return res.status(200).send({
         ok: true, user, token: generateToken({ userId: user?.id }), message: 'Google auth was successfully performed'
      });
   }
}
