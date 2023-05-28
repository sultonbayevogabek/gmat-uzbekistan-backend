const Joi = require('joi')

module.exports = Joi.object({
   name: Joi.string()
      .required()
      .min(3)
      .max(50)
      .pattern(new RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"))
      .error(Error('Name must be entered. The name can only consist of Latin letters. Must be at least 3 characters long')),
   phone: Joi.string()
      .required()
      .min(3)
      .max(32)
      .pattern(new RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"))
      .error(Error('Last name must be entered. The name can only consist of Latin letters. Must be at least 3 characters long')),
   password: Joi.string()
      .required()
      .min(3)
      .error(Error('Password length must be at least 6 characters'))
})
