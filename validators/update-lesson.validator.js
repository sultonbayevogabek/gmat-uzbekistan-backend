import Joi from 'joi';

const schema = Joi.object({
    id: Joi
        .string()
        .uuid()
        .required(),
    title: Joi
        .string()
        .trim()
        .max(128)
        .required(),
    duration: Joi
        .string()
        .trim()
        .max(16)
        .required(),
    description: Joi
        .string()
        .trim()
        .max(256)
        .required(),
    unit: Joi
        .string()
        .max(16)
        .required()
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
