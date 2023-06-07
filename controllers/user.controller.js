import UserService from '../services/user.service.js';

const { getUser, changePassword } = new UserService();

export class UserController {
   async getUser(req, res) {
      return getUser(req, res);
   }

   async changePassword(req, res) {
      return changePassword(req, res);
   }
}
