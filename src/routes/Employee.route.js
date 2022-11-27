const { Router } = require('express');
const employeeController = require('../controllers/Employee.controller')

const route = Router();

route.get('/getEmployee', employeeController.getEmployee);
route.post('/addEmployee', employeeController.addEmployee);
route.post('/editEmployee', employeeController.editEmployee);
route.post('/deleteEmployee', employeeController.deleteEmployee);


module.exports = route;