import { User } from '../models/models.js';
import { BcryptService } from './bcrypt.service.js';

const { generateHash, compareHash } = new BcryptService();

export default class UserService {
   updatePassword = async (req, res, newPassword) => {
      await User.update({
         password: await generateHash(newPassword)
      }, { where: { id: req.user.id } });

      return res.status(200).send({
         ok: true,
         message: `Password changed`
      });
   }

   getUser = async(req, res) => {
      return res.status(200).send({
         ok: true,
         user: req.user
      });
   }

   changePassword = async (req, res) => {
      let { currentPassword, newPassword } = req.body;

      if (req.user?.email && !req.user?.password) {
         await this.updatePassword(req, res, newPassword);
         return;
      }

      const isCurrentPasswordCorrect = await compareHash(currentPassword, req.user.password);

      if (!isCurrentPasswordCorrect) {
         return res.status(400).send({
            ok: false,
            error: 'Current password is incorrect'
         });
      }

      await this.updatePassword(req, res, newPassword);
   }
}
