import AuthService from '../services/auth.service.js';

const { signUp, signIn, googleAuth } = new AuthService();
export class AuthController {
   async signUp(req, res) {
     return await signUp(req,res)
   }

   async signIn(req, res) {
      return signIn(req,res)
   }

   async googleAuth(req, res) {
    return googleAuth(req,res)
   }

}
