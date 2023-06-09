import UserService from '../services/user.service.js';

const { getUser, changePassword, updateCredentials, uploadAvatar } = new UserService();

export class UserController {
   async getUser(req, res) {
      return getUser(req, res);
   }

   async changePassword(req, res) {
      return changePassword(req, res);
   }

   async updateCredentials(req, res) {
      return updateCredentials(req, res);
   }

   async uploadAvatar(req, res) {
      return uploadAvatar(req, res);
   }
}
