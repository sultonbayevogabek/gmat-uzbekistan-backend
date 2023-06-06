import { verifyToken } from '../services/jwt.service.js';

export default async (req, res, next) => {
   const token = req.headers.token;

   if (token && verifyToken(token)) {
      const { userId } = verifyToken(token);
      req.userId = userId;
   }

   next();
}
