import jwt from 'jsonwebtoken';
import config from '../config.js';

const { sign, verify } = jwt;
export const generateToken = data => sign(data, config.SECRET_WORD);
export const verifyToken = data => {
   try {
      return verify(data, config.SECRET_WORD);
   } catch (e) {
      return false;
   }
};
