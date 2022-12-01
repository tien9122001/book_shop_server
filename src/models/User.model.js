const { dataAccess } = require('../helpers/connect_mssql')


async function getUserByUsername(username){
    try {
        const query = `SELECT * FROM users WHERE username = '${username}'`;
        const result = (await dataAccess.query(query)).recordset;
        return ({result});
    } catch (error) {
        throw error;
    }
}


async function getAllUsers(){
    try {
        const query = "SELECT * FROM users";
        const result = (await dataAccess.query(query)).recordset;
        return ({result});
    } catch (error) {
        throw new Error("Can't get all user!")
    }
}

async function getAuthorUser(username){
    try {
        const query = `SELECT * FROM authorities where username = '${username}'`;
        const result = (await dataAccess.query(query)).recordset;
        return ({result});
    } catch (error) {
        throw new Error("Can't get author!")
    }
}

async function addUser(data){
    try {
        const query = `insert into users (username, MANV, password, enabled)
            values ('${data.username}','NV4', '${data.hashPass}', 1)`;
        await dataAccess.query(query);
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getAllUsers,
    getUserByUsername,
    addUser
}