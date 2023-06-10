import { User } from '../models/models.js';
import { BcryptService } from './bcrypt.service.js';
import { join } from 'path';

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
}
