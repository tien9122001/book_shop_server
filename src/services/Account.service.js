const jwt = require('../helpers/jsonwebtoken');
const newError = require('http-errors');
const { genBcryptHash, comparePass } = require('../helpers/hash_bcrypt');
const { getUserByUsername, addUser } = require('../models/User.model');
const redisClient = require('../helpers/redis_client');

async function verifyUser(user, pass) {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await getUserByUsername(user);
            const { username, password } = data.result[0];
            const checkPass = await comparePass(pass, password);
            if (user == username && checkPass) {
                resolve(true);
            }
            reject(newError.Unauthorized("Login fail!"));
        } catch (error) {
            reject(newError.Unauthorized('Username is never used!'))
        }
    })
}


async function newLogin(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const { username, password } = data;
            getUserByUsername(username)
                .then(({ result }) => {
                    if (result[0])
                        reject(newError.Conflict("Username is used!"));
                })
                .catch();
            const hashPass = await genBcryptHash(password);
            await addUser({ username, hashPass });
            resolve(true);
        } catch (error) {
            reject(error);
        }
    })
}


async function logOut(username) {
    redisClient.set('refToken' + username, '', { EX: (1) });
}

module.exports = {
    verifyUser,
    newLogin,
    logOut
}