const { Router } = require('express');
const accountController = require('../controllers/Account.controller');

const route = Router();




route.post('/login', accountController.login);
route.post('/refreshToken', accountController.getAccessToken);
route.post('/signUp', accountController.signUp);
route.post('/logout', accountController.logOut);


module.exports = route;


