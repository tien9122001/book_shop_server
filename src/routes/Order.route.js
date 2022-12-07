const {Router} = require('express');
const orderController = require('../controllers/Order.controller');
const route = Router();

route.get('/getAll', orderController.getAllOrder);

module.exports = route;