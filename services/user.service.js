import { User, Payment, Lesson } from '../models/models.js';
import { BcryptService } from './bcrypt.service.js';
import { join } from 'path';
import { unlink } from 'fs/promises';
import { Op } from 'sequelize';

const { generateHash, compareHash } = new BcryptService();

export default class UserService {
    updatePassword = async (req, res, newPassword) => {
        await User.update({
            password: await generateHash(newPassword)
        }, { where: { id: req.user.id } });

        return res.status(200).send({
            ok: true,
            message: `Password changed`
        });
    };

    getUser = async (req, res) => {
        return res.status(200).send({
            ok: true,
            user: req.user
        });
    };

    changePassword = async (req, res) => {
        const { currentPassword, newPassword } = req.body;

        if (req.user?.email && !req.user?.password) {
            await this.updatePassword(req, res, newPassword);
            return;
        }

        const isCurrentPasswordCorrect = await compareHash(currentPassword, req.user.password);

        if (!isCurrentPasswordCorrect) {
            return res.status(400).send({
                ok: false,
                error: 'Current password is incorrect'
            });
        }

        await this.updatePassword(req, res, newPassword);
    };

    updateCredentials = async (req, res) => {
        const { name, phone } = req.body;

        const user = await User.findOne({
            where: { phone }
        });

        if (user && req.user?.id !== user?.id) {
            return res.status(400).send({
                ok: false,
                error: 'This phone number belongs to another user'
            });
        }

        await User.update({
            name, phone
        }, { where: { id: req.user.id } });

        return res.status(200).send({
            ok: true,
            message: 'User credentials successfully updated'
        });
    };

    uploadAvatar = async (req, res) => {
        const avatar = req.files?.avatar;

        if (avatar?.size > 3145728 || ![ 'image/jpeg', 'image/png', 'image/jpg' ].includes(avatar?.mimetype)) {
            return res.status(400).send({
                ok: false,
                message: 'Image must .jpeg or .png and size less than 3 mb'
            });
        }

        await avatar.mv(join('public', 'avatars', `${ avatar.md5 }.${ avatar.mimetype.split('/')[1] }`));

        const user = await User.update({
            avatar: `avatars/${ avatar.md5 }.${ avatar.mimetype.split('/')[1] }`
        }, { where: { id: req.user.id } });

        return res.status(200).send({
            ok: true,
            message: 'Avatar updated successfully'
        });
    };

    uploadScreenshot = async (req, res) => {
        const hasScreenshot = await Payment.findOne({
            where: { paymentUserId: req?.user?.id }
        });

        if (hasScreenshot) {
            return res.status(400).send({
                ok: false,
                message: 'User can upload only one screenshot file'
            });
        }

        const screenshot = req.files?.screenshot;

        if (screenshot?.size > 3145728 || ![ 'image/jpeg', 'image/png', 'image/jpg' ].includes(screenshot?.mimetype)) {
            return res.status(400).send({
                ok: false,
                message: 'Screenshot must .jpeg or .png and size less than 3 mb'
            });
        }

        await screenshot.mv(join('public', 'screenshots', `${ screenshot.md5 }.${ screenshot.mimetype.split('/')[1] }`));

        const payment = await Payment.create({
            paymentUserId: req.user.id,
            paymentScreenshot: `screenshots/${ screenshot.md5 }.${ screenshot.mimetype.split('/')[1] }`
        });

        return res.status(200).send({
            ok: true,
            message: 'Screenshot file uploaded'
        });
    };

    deleteScreenshot = async (req, res) => {
        const id = req?.body?.id;

        const screenshot = await Payment.findOne({
            where: { id }
        });

        if (!screenshot || screenshot?.paymentUserId !== req?.user?.id) {
            return res.status(400).send({
                ok: false,
                message: 'You can not delete screenshot'
            });
        }

        await unlink(join('public', screenshot?.paymentScreenshot));
        await Payment.destroy({ where: { id: screenshot?.id } });

        return res.status(200).send({
            ok: true,
            message: 'Screenshot deleted'
        });
    };

    getScreenshots = async (req, res) => {
        const screenshots = await Payment.findAll({
            where: { paymentUserId: req?.user?.id }
        });

        return res.status(200).send({
            ok: true,
            screenshots
        });
    };

    getLessons = async (req, res) => {
        const unit = req?.body?.unit;
        const title = req?.body?.title;

        const whereCondition = {};

        if (unit !== 'all') {
            whereCondition.unit = unit;
        }

        if (title) {
            whereCondition.title = {
                [Op.iLike]: '%' + title + '%'
            };
        }

        const attributes = [ 'id', 'title', 'duration', 'description', 'unit', 'views' ];

        if ([ 'admin', 'premium-user' ].includes(req?.user?.role)) {
            attributes.push('videoId', 'pdfFiles', 'videoUrl');
        }
        const rows = await Lesson.findAll({
            where: whereCondition,
            attributes
        });

        return res.status(200).send({
            ok: true,
            lessons: rows,
            count: 0
        });
    };

    incrementViewsCount = async (req, res) => {
        const { id } = req?.body;

        const lesson = await Lesson.increment('views', {
            by: 1,
            where: { id }
        });

        return res.status(200).send({
            ok: true,
            message: 'View count incremented',
            lesson
        });
    };
}
