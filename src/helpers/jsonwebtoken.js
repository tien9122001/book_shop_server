const newError = require('http-errors');
const jwt = require('jsonwebtoken');


const secretToken = process.env.SECRETTOKEN;
const secretRefreshToken = process.env.SECRETREFRESHTOKEN;


function signToken(payload) {
    return new Promise((resolve, reject) => {
        const options = {
            expiresIn: '10m',
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


function signRefreshToken(payload) {
    return new Promise((resolve, reject) => {
        const options = {
            expiresIn: '10m',
        }
        jwt.sign({ payload }, secretRefreshToken, options, (err, encode) => {
            console.log({
                payload,
                secretToken
            });
            if (err) {
                reject(err);
            }
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
