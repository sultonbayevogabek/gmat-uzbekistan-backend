import AdminService from '../services/admin.service.js';

const { getAllUsers, deleteUser, changeRole } = new AdminService();

export class AdminController {
   async getAllUsers(req, res) {
      return getAllUsers(req, res);
   }

   async deleteUser(req, res) {
      return deleteUser(req, res);
   }

   async changeRole(req, res) {
      return changeRole(req, res);
   }
}
