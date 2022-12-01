const { NText } = require('mssql');
const cartService = require('../services/Cart.service');

class Cart {
    async addToCart(req, res, next) {
        try {
            const { username, item, count} = req.body;
            cartService.setCart(username, item, count);
            res.json({
                message : "Add to cart success!"
            })
        } catch (error) {
            next(error);
        }
    }

    async getCart(req, res, next) {
        try {
            const {username} = req.body;
            const data = await cartService.getAllCart(username);
            // console.log("Controller:::",data);
            res.json({
                message : "Get all for user!",
                data
            })
        } catch (error) {
            next(error)
        }

    }
}


module.exports = new Cart();