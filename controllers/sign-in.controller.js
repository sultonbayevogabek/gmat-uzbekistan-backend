import {User} from '../models/models.js'
import {compareHash} from '../services/bcrypt.service.js'
import {generateToken} from '../services/jwt.service.js'

export default async (req, res) => {
    let { phone, password } = req.body

    phone = phone?.trim()
    password = password?.trim()

    const errors = []

    if (!phone || !/^998([378]{2}|(9[013-57-9]))\d{7}$/.test(phone)) {
        errors.push('Invalid phone number')
    }

    if (!password || password?.length < 6) {
        errors.push('Invalid password')
    }

    if (errors.length) {
        return res.status(400).send({
            ok: false,
            errors
        })
    }

    const user = await User.findOne({
        where: {
            phone
        }
    })

    if (!user) {
        return res.status(404).send({
            ok: false,
            errors: ['User not found']
        })
    }

    if (user) {
        if (user.isDeleted) {
            return res.status(400).send({
                ok: false,
                errors: ['User has been blocked by system']
            })
        }

        const isPasswordCorrect = await compareHash(password, user?.password)
        if (!isPasswordCorrect) {
            return res.status(400).send({
                ok: false,
                errors: ['Incorrect password']
            })
        }

        delete user?.dataValues?.password

        return res.status(200).send({
            ok: true,
            message: `Login was successfully performed`,
            user,
            token: generateToken({ id: user.id })
        })
    }
}
