const userService = require('../services/User.service');


class User {
    async getUsers(req, res, next) {
        try {
            const data = userService.getAllUser();
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
}



module.exports = new User();