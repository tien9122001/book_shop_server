const {Router} = require('express');
const cartController = require('../controllers/Cart.controller');
const route = Router();


route.post('/setCart', cartController.addToCart)
route.post('/getCart', cartController.getCart)

module.exports = route;