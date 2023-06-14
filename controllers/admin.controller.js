import AdminService from '../services/admin.service.js';

const {
    getAllUsers,
    deleteUser,
    changeRole,
    setScreenshotAsSeen,
    createLesson,
    updateLesson,
    deleteLesson,
    getLessons
} = new AdminService();

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

    async setScreenshotAsSeen(req, res) {
        return setScreenshotAsSeen(req, res);
    }

    async createLesson(req, res) {
        return createLesson(req, res);
    }

    async updateLesson(req, res) {
        return updateLesson(req, res);
    }

    async deleteLesson(req, res) {
        return deleteLesson(req, res);
    }

    async getLessons(req, res) {
        return getLessons(req, res);
    }
}
