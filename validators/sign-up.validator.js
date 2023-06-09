import Joi from 'joi';

const schema = Joi.object({
    name: Joi.string()
        .required()
        .trim()
        .min(3)
        .max(32),
    phone: Joi.string()
        .required()
        .trim()
        .pattern(new RegExp(/^\+998[0-9]{9}$/)),
    password: Joi.string()
        .required()
        .min(6)
});

export default async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body);
        next();
    } catch (error) {
        res.status(400).send({
            ok: false,
            error: error?.details[0]?.message
        });
    }
}
