import UserService from '../services/user.service.js';

const {
    getUser, changePassword,
    updateCredentials, uploadAvatar,
    uploadScreenshot, deleteScreenshot,
    getScreenshots, getLessons,
    incrementViewsCount
} = new UserService();

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

    async uploadScreenshot(req, res) {
        return uploadScreenshot(req, res);
    }

    async deleteScreenshot(req, res) {
        return deleteScreenshot(req, res);
    }

    async getScreenshots(req, res) {
        return getScreenshots(req, res);
    }

    async getLessons(req, res) {
        return getLessons(req, res);
    }
    async incrementViewsCount(req, res) {
        return incrementViewsCount(req, res);
    }
}
