
const routeHome = require('./Home.route');
const routeBook = require('./Book.route');
const routeEmployee = require('./Employee.route');
const routeCustomer = require('./Customer.route');
const routeUser = require('./User.route');
const { checkLogin } = require('../middlewares/Login.middleware');

function route(app) {
    app.use('/book', checkLogin, routeBook);
    app.use('/employee', routeEmployee);
    app.use('/customer', routeCustomer);
    app.use('/user', routeUser);
    app.use('/', routeHome);
}


module.exports = route;