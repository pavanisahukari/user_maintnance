const Joi = require('joi')
const schema = Joi.object({
    email:  Joi.string().pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    first_name: Joi.string().required(),
	last_name:  Joi.string().required(),
    password: Joi.string().required(),
})
module.exports = schema
