import { User, Payment } from '../models/models.js';

export default class AdminService {
   getAllUsers = async (req, res) => {
      const { count, rows: users } = await User.findAndCountAll(
         {
            where: { isDeleted: false },
            order: [ [ 'updatedAt', 'DESC' ] ],
            include: [Payment]
         });

      return res.status(200).send({
         ok: true,
         users,
         count
      });
   };

   deleteUser = async (req, res) => {
      const user = User.update({
         isDeleted: true
      }, { where: { id: req.body?.id }})

      return res.status(200).send({
         ok: true,
         message: 'User deleted'
      })
   };

   changeRole = async (req, res) => {
      const user = await User.findOne({
         where: { id: req.body?.id }
      })

      if (!user) {
         return res.status(404).send({
            ok: false,
            message: 'User not found'
         })
      }

      await User.update({
         role: user?.role === 'user' ? 'premium-user' : 'user'
      }, { where: { id: user?.id } })


      return res.status(200).send({
         ok: true,
         message: 'Role changed'
      })
   };

   setScreenshotAsSeen = async (req, res) => {
      await Payment.update({
         seenTime: new Date()
      }, { where: { id: req?.body?.id }})

      return res.status(200).send({
         ok: true,
         message: 'Screenshot set as seen'
      })
   }

   createLesson = async (req, res) => {
      console.log(req.body);
      console.log(req.files);

      return res.status(200).send({
         ok: true,
         message: 'Screenshot set as seen'
      })
   }
}
