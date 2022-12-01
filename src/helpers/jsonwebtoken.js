const newError = require('http-errors');
const jwt = require('jsonwebtoken');
const redisClient = require('./redis_client')


const secretToken = process.env.SECRETTOKEN;
const secretRefreshToken = process.env.SECRETREFRESHTOKEN;


function signToken(payload) {
    return new Promise((resolve, reject) => {
        const options = {
            expiresIn: '10s',
        }
        jwt.sign({ payload }, secretToken, options, (err, encode) => {
            console.log({
                payload,
                secretToken
            });
            if (err) {
                reject(err);
            }
            resolve(encode);
        });
    });
}


function verifyToken(encode) {
    return new Promise((resolve, reject) => {
        jwt.verify(encode, secretToken, (err, decode) => {
            if (err) {
                if (err.message === 'jwt expired')
                    reject(newError.Unauthorized('Token is expired'));
                reject(newError.Unauthorized("Can't verify token"));
            }
            resolve(decode);
        })
    })
}


function signRefreshToken(username) {
    return new Promise((resolve, reject) => {
        const options = {
            expiresIn: '10d',
        }
        jwt.sign({ username }, secretRefreshToken, options, (err, encode) => {
            console.log({
                username,
                secretToken
            });
            if (err) {
                reject(err);
            }
            redisClient.set('refToken' + username, encode, { EX: (60 * 10) });   
            resolve(encode);
        });
    })
}


function verifyRefreshToken(encode) {
    return new Promise((resolve, reject) => {
        jwt.verify(encode, secretRefreshToken, (err, decode) => {
            if (err) {
                reject(new Error("Can't verify refresh token"));
            }
            resolve(decode);
        })
    })
}


module.exports = {
    signToken,
    verifyToken,
    signRefreshToken,
    verifyRefreshToken
}
