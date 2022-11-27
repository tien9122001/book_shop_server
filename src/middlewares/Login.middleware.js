const newError = require('http-errors');
const { verifyToken } = require('../helpers/jsonwebtoken')



async function checkLogin(req, res, next) {
    try {
        const { token } = req.body;
        if (!token)
            throw (newError.Unauthorized('Token is missing!'));
        const username = await verifyToken(token);
        next(); 
    } catch (error) {
        next(error);
    }
}




module.exports = {
    checkLogin
}