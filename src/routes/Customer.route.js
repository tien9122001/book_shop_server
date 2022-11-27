const {Router} = require('express');
const customerController = require('../controllers/Customer.controller');
const route = Router();


route.get('/getCustomer', customerController.getCustomer);
route.post('/addCustomer', customerController.addCustomer);
route.post('/deleteCustomer', customerController.deleteCustomer);
route.post('/editCustomer', customerController.editCustomer);


module.exports = route;