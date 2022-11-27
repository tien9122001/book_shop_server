const newError = require('http-errors');
const { signToken, verifyToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jsonwebtoken')
const { verifyUser, newLogin } = require('../services/Account.service')

class Account {
    async login(req, res, next) {
        const { username, password } = req.body;
        try {
            // const checkUser = verifyUser(username, password);
            await verifyUser(username, password);
            const token = await signToken(username);
            const refreshToken = await signRefreshToken(username);
            res.json({
                token,
                refreshToken,
                message: "Login done!",
            })
        } catch (error) {
            next(error);
        }
    }

    async signUp(req, res, next) {
        try {
            const { username, password } = req.body;
            await newLogin({username, password});
            res.json({
                message : "Sign Up done!"
            })
        } catch (error) {
            next(error);
        }
    }


    async logOut(req, res, next) {

    }

    async getAccessToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken)
                throw (newError.Unauthorized('RefreshToken is missing!'));
            const username = await verifyRefreshToken(refreshToken);
            const token = await signToken(username);
            res.json({
                token,
                message : "Get new access token success!"
            })
        } catch (error) {
            next(error);
        }
    }


}


module.exports = new Account();