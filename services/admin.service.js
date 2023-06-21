import { User, Payment, Lesson } from '../models/models.js';
import { join } from 'path';
import { Op } from 'sequelize';

export default class AdminService {
    getAllUsers = async (req, res) => {
        const userWhereCondition = {
            isDeleted: false,
        };

        const name = req.body?.name || '';
        const role = req.body?.role || 'all';
        const screenshotSeen = req.body?.screenshotSeen || 'all';

        if (name) {
            userWhereCondition.name = { [Op.iLike]: '%' + name + '%' };
        }

        if (role !== 'all') {
            userWhereCondition.role = role;
        }

        let { count, rows: users } = await User.findAndCountAll({
            where: userWhereCondition, include: [ {
                model: Payment
            } ],
            order: [ [ 'updatedAt', 'DESC' ] ]
        });

        if (screenshotSeen === 'seen') {
            users = users.filter((u) => u?.payment && u?.payment?.seenTime);
        }

        if (screenshotSeen === 'not-seen') {
            users = users.filter((u) => u?.payment && !u?.payment?.seenTime);
        }

        users = users.sort((a, b) => {
            return a?.payment?.seenTime - b?.payment?.seenTime;
        });

        return res.status(200).send({
            ok: true, users, count
        });
    };

    deleteUser = async (req, res) => {
        const user = User.update({
            isDeleted: true
        }, { where: { id: req.body?.id } });

        return res.status(200).send({
            ok: true, message: 'User deleted'
        });
    };

    changeRole = async (req, res) => {
        const user = await User.findOne({
            where: { id: req.body?.id }
        });

        if (!user) {
            return res.status(404).send({
                ok: false, message: 'User not found'
            });
        }

        await User.update({
            role: user?.role === 'user' ? 'premium-user' : 'user'
        }, { where: { id: user?.id } });


        return res.status(200).send({
            ok: true, message: 'Role changed'
        });
    };

    setScreenshotAsSeen = async (req, res) => {
        await Payment.update({
            seenTime: new Date()
        }, { where: { id: req?.body?.id } });

        return res.status(200).send({
            ok: true, message: 'Screenshot set as seen'
        });
    };

    createLesson = async (req, res) => {
        const { title, duration, unit, description, videoId } = req.body;
        const files = req?.files?.files;

        const pdfFiles = [];
        if (files) {
            const isFilesArray = Array.isArray(files);

            if (isFilesArray) {
                await Promise.all(files.map(async file => {
                    await file.mv(join('public', 'pdf', `${ file.md5 }.${ file.mimetype.split('/')[1] }`));
                    pdfFiles.push(`pdf/${ file.md5 }.${ file.mimetype.split('/')[1] }`);
                }));
            }

            if (!isFilesArray) {
                await files.mv(join('public', 'pdf', `${ files.md5 }.${ files.mimetype.split('/')[1] }`));
                pdfFiles.push(`pdf/${ files.md5 }.${ files.mimetype.split('/')[1] }`);
            }
        }

        await Lesson.create({
            title, duration, unit, description, pdfFiles, views: 0, videoId
        });

        return res.status(200).send({
            ok: true, message: 'Lesson successfully created'
        });
    };

    updateLesson = async (req, res) => {
        const { id, title, duration, unit, description, videoId } = req.body;
        const files = req?.files?.files;

        const pdfFiles = [];
        if (files) {
            const isFilesArray = Array.isArray(files);

            if (isFilesArray) {
                await Promise.all(files?.map(async file => {
                    await file.mv(join('public', 'pdf', `${ file.md5 }.${ file.mimetype.split('/')[1] }`));
                    pdfFiles.push(`pdf/${ file.md5 }.${ file.mimetype.split('/')[1] }`);
                }));
            }

            if (!isFilesArray) {
                await files.mv(join('public', 'pdf', `${ files.md5 }.${ files.mimetype.split('/')[1] }`));
                pdfFiles.push(`pdf/${ files.md5 }.${ files.mimetype.split('/')[1] }`);
            }
        }

        const body = {
            title, duration, unit, description, videoId
        };

        if (pdfFiles.length) {
            body.pdfFiles = pdfFiles;
        }

        await Lesson.update(body, {
            where: {
                id
            }
        });

        return res.status(200).send({
            ok: true, message: 'Lesson successfully updated'
        });
    };

    deleteLesson = async (req, res) => {
        const { id } = req.body;

        await Lesson.destroy({
            where: {
                id
            }
        });

        return res.status(200).send({
            ok: true, message: 'Lesson successfully deleted'
        });
    };
}
