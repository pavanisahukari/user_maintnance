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
        else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            console.log("Validator Error -- ", message)
            return res.status(422).json(message);
        }
}
}
exports.validateproperties = validateproperties;


