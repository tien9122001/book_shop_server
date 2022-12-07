const jwt = require('../helpers/jsonwebtoken');
const prismaClient = require('../helpers/prisma_client');
const newError = require('http-errors');
const { genBcryptHash, comparePass } = require('../helpers/hash_bcrypt');
const { getUserByUsername, addUser } = require('../models/User.model');
const redisClient = require('../helpers/redis_client');

async function verifyUser(user, pass) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await prismaClient.users.findFirst({
                where : {
                    username : user
                }
            });
            console.log(result);
            const { username, password } = result;
            const checkPass = await comparePass(pass, password);
            if (user == username && checkPass) {
                resolve(true);
            }
            reject(newError.Unauthorized("Login fail!"));
        } catch (error) {
            reject(newError.Unauthorized('Username is never used!'))
            // reject(error)
        }
    })
}


async function newLogin(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const { username, password } = data;
            const result = await prismaClient.users.findFirst({
                where : {
                    username : user
                }
            });
            if (result)
                        reject(newError.Conflict("Username is used!"));
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