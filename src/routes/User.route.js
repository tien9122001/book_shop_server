const { Router } = require('express');
const accountController = require('../controllers/Account.controller');
const { checkLogin } = require('../middlewares/Login.middleware');

const route = Router();




route.post('/login', accountController.login);
route.post('/refreshToken', accountController.getAccessToken);
route.post('/signUp', accountController.signUp);
route.post('/logout', checkLogin, accountController.logOut);


module.exports = route;


