const joi = require('joi');

const userValid = joi.object({
    username : joi.string()
})


module.exports = {
    userValid
}