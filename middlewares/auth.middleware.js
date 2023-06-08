import { User } from '../models/models.js';
import { JwtService } from '../services/jwt.service.js';

const { verifyToken } = new JwtService()

export default async (req, res, next) => {
   const token = req.headers.token;

   if (!token || !verifyToken(token)) {
      return res.status(401).send({
         ok: false,
         error: 'Not authorized'
      });
   }

   if (token && verifyToken(token)) {
      const { userId } = verifyToken(token);

      const user = await User.findOne({
         where: { id: userId, isDeleted: false }
      });

      if (!user) {
         return res.status(401).send({
            ok: false,
            error: 'Not authorized'
         });
      }

      req.user = user;
   }

   next();
}
