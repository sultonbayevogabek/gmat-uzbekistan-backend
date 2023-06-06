import { User } from '../models/models.js';

export default async (req, res, next) => {
   if (!req.userId) {
      return res.status(401).send({
         ok: false,
         error: 'Not authorized'
      });
   }

   const user = await User.findOne({
      where: { id: req.userId, isDeleted: false }
   });

   if (!user) {
      return res.status(401).send({
         ok: false,
         error: 'Not authorized'
      });
   }

   req.user = user;

   next();
}
