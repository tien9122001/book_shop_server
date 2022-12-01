const userModel = require('../models/User.model');

async function getAllUser() {
    try {
        const data = await userModel.getAllUsers();
    } catch (error) {
        throw error;
    }
    return data;
}



module.exports = {
    getAllUser
}