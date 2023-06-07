import { User } from '../models/models.js';
import { BcryptService } from '../services/bcrypt.service.js';

const bcryptService = new BcryptService();

export class UserController {
   async getUser(req, res) {
      delete req.user.dataValues.password;
      return res.status(200).send({
         ok: true,
         user: req.user
      });
   }

   async changePassword(req, res) {
      let { currentPassword, newPassword } = req.body;

      const isCurrentPasswordCorrect = await bcryptService.compareHash(currentPassword, req.user.password);

      if (!isCurrentPasswordCorrect) {
         return res.status(400).send({
            ok: false,
            error: 'Current password is incorrect'
         });
      }

      await User.update({
         password: await bcryptService.generateHash(newPassword)
      }, { where: { id: req.user.id } });

      return res.status(200).send({
         ok: true,
         message: `Password changed`
      });
   }
}
