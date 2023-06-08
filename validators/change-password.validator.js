import Joi from 'joi';

const schema = Joi.object({
   currentPassword: Joi
      .string(),
   newPassword: Joi
      .string()
      .min(6)
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
