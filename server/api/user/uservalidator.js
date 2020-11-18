const Joi = require('joi')

const validateproperties = (schema, param) => {
    return (req, res, next) => {
    console.log(req[param],"called")
    const {error} =schema.validate(req[param]) // validates fine
    console.log(error)
    const valid = error == null
    console.log(valid)
        if (valid) {
            next();
        }
}
}
exports.validateproperties = validateproperties;


