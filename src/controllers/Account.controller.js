const newError = require('http-errors');
const { signToken, verifyToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jsonwebtoken')
const { verifyUser, newLogin, logOut } = require('../services/Account.service')
const redisClient = require('../helpers/redis_client');

class Account {
    async login(req, res, next) {
        const { username, password } = req.body;
        try {
            if(!username) throw newError.BadRequest("Username is missing!")
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
            await newLogin({ username, password });
            res.json({
                message: "Sign Up done!"
            })
        } catch (error) {
            next(error);
        }
    }


    async logOut(req, res, next) {
        try {
            const { username } = req.body;
            await logOut(username);
            res.json({
                message : "Logout success!"
            })
        } catch (error) {
            next(error);
        }
        
    }

    async getAccessToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken)
                throw (newError.Unauthorized('RefreshToken is missing!'));
            const payload = await verifyRefreshToken(refreshToken);
            console.log({payload});
            const flag = await redisClient.get('refToken' + payload.username);
            console.log('flag', flag);
            if (!flag || (flag != refreshToken)) {
                throw newError.Unauthorized('RefreshToken is wrong!');
            }
            const token = await signToken(payload.username);
            res.json({
                token,
                message: "Get new access token success!"
            })
        } catch (error) {
            next(error);
        }
    }


}


module.exports = new Account();