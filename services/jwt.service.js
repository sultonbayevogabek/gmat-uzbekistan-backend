import jwt from 'jsonwebtoken';
import config from '../config.js';

const { sign, verify } = jwt;

export class JwtService {
    generateToken(data) {
        return sign(data, config.SECRET_WORD);
    }

    verifyToken(token) {
        try {
            return verify(token, config.SECRET_WORD);
        } catch (e) {
            return false;
        }
    }
}
