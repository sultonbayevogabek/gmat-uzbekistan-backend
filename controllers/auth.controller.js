import AuthService from '../services/auth.service.js';


export class AuthController {
   constructor() {
      this.authService = new AuthService()
   }
   async signUp(req, res) {
     return await this.authService.signUp(req,res)
   }

   async signIn(req, res) {
      return this.authService.signIn(req,res)
   }

   async googleAuth(req, res) {
    return this.authService.googleAuth(req,res)
   }

}
