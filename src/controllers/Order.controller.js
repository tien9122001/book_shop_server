const orderService = require('../services/Order.service');

class Order {
    async getAllOrder(req, res, next) {
        try {
            const result = await orderService.getAllOrder(userId);
            req.json({
                orders : result,
                total : (result.length)
            })
        } catch (error) {
            next(error);
        }
    }
}


module.exports = new Order();