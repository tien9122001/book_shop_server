const {Router} = require('express');
const route = Router();
const accountController = require('../controllers/Account.controller')


route.post('/', accountController.signUp)


module.exports = route;
