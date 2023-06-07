import { User } from '../models/models.js';
import { BcryptService } from './bcrypt.service.js';

const { generateHash, compareHash } = new BcryptService();

export default class UserService {
   async getUser(req, res) {
      delete req.user.dataValues.password;
      return res.status(200).send({
         ok: true,
         user: req.user
      });
   }

   async changePassword(req, res) {
      let { currentPassword, newPassword } = req.body;

      const isCurrentPasswordCorrect = await compareHash(currentPassword, req.user.password);

      if (!isCurrentPasswordCorrect) {
         return res.status(400).send({
            ok: false,
            error: 'Current password is incorrect'
         });
      }

      await User.update({
         password: await generateHash(newPassword)
      }, { where: { id: req.user.id } });

      return res.status(200).send({
         ok: true,
         message: `Password changed`
      });
   }
}
