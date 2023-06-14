import { User, Payment, Lesson } from '../models/models.js';
import { join } from 'path';

export default class AdminService {
    getAllUsers = async (req, res) => {
        const { count, rows: users } = await User.findAndCountAll(
            {
                where: { isDeleted: false },
                order: [ [ 'updatedAt', 'DESC' ] ],
                include: [ Payment ]
            });

        return res.status(200).send({
            ok: true,
            users,
            count
        });
    };

    deleteUser = async (req, res) => {
        const user = User.update({
            isDeleted: true
        }, { where: { id: req.body?.id } });

        return res.status(200).send({
            ok: true,
            message: 'User deleted'
        });
    };

    changeRole = async (req, res) => {
        const user = await User.findOne({
            where: { id: req.body?.id }
        });

        if (!user) {
            return res.status(404).send({
                ok: false,
                message: 'User not found'
            });
        }

        await User.update({
            role: user?.role === 'user' ? 'premium-user' : 'user'
        }, { where: { id: user?.id } });


        return res.status(200).send({
            ok: true,
            message: 'Role changed'
        });
    };

    setScreenshotAsSeen = async (req, res) => {
        await Payment.update({
            seenTime: new Date()
        }, { where: { id: req?.body?.id } });

        return res.status(200).send({
            ok: true,
            message: 'Screenshot set as seen'
        });
    };

    createLesson = async (req, res) => {
        const { title, duration, unit, videoId, description } = req.body;
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
            title, duration, unit, videoId, description, pdfFiles
        });

        return res.status(200).send({
            ok: true,
            message: 'Lesson successfully created'
        });
    };

    updateLesson = async (req, res) => {
        const { id, title, duration, unit, videoId, description } = req.body;
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

        const body = {
            title, duration, unit, videoId, description
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
            ok: true,
            message: 'Lesson successfully updated'
        });
    };

    getLessons = async (req, res) => {
        const attributes = ['id', 'title', 'duration', 'description', 'unit']

        if (['admin', 'premium-user'].includes(req?.user?.role)) {
            attributes.push('videoId', 'pdfFiles')
        }
        const { count, rows } = await Lesson.findAndCountAll({
            attributes
        });

        return res.status(200).send({
            ok: true,
            lessons: rows,
            count
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
            ok: true,
            message: 'Lesson successfully deleted'
        });
    };
}
