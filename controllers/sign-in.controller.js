import {User} from '../models/models.js'
import {compareHash} from '../services/bcrypt.service.js'
import {generateToken} from '../services/jwt.service.js'

export default async (req, res) => {
    let { phone, password } = req.body

    const user = await User.findOne({
        where: {
            phone
        }
    })

    if (!user) {
        return res.status(404).send({
            ok: false,
            error: 'User not found'
        })
    }

    if (user) {
        if (user.isDeleted) {
            return res.status(400).send({
                ok: false,
                error: 'User has been blocked by system'
            })
        }

        const isPasswordCorrect = await compareHash(password, user?.password)
        if (!isPasswordCorrect) {
            return res.status(400).send({
                ok: false,
                error: 'Incorrect password'
            })
        }

        delete user?.dataValues?.password

        return res.status(200).send({
            ok: true,
            message: `Login was successfully performed`,
            user,
            token: generateToken({ userId: user.id })
        })
    }
}
