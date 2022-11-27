const bcrypt = require('bcrypt');
const newError = require('http-errors');

const round = process.env.BCRYPTROUND || 10;

function genBcryptHash(pass) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(pass, round, (err, hash) => {
            if(err)
                reject(newError.InternalServerError("Can't generate hash password!"));
            resolve(hash);
        })
    })
}


function comparePass(plainTextPass, hashPass) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainTextPass, hashPass, function(err, result) {
            if(err)
                reject(newError.InternalServerError("Can't compare password!"));
            resolve(result);
        });
    })
}


module.exports = {
    genBcryptHash,
    comparePass
}