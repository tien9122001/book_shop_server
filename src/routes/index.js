
const routeHome = require('./Home.route');
const routeBook = require('./Book.route');
const routeEmployee = require('./Employee.route');
const routeCustomer = require('./Customer.route');
const routeUser = require('./User.route');
const routeCart = require('./Cart.route');
const routeOrder = require('./Order.route');
const { checkLogin } = require('../middlewares/Login.middleware');

function route(app) {
    app.use('/book', checkLogin, routeBook);
    app.use('/employee', checkLogin, routeEmployee);
    app.use('/customer', checkLogin, routeCustomer);
    app.use('/user', routeUser);
    app.use('/cart', routeCart);
    app.use('/order', routeOrder);
    app.use('/', routeHome);
}


module.exports = route;