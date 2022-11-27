const { Router } = require('express');
const bookController = require('../controllers/Book.controller');
const route = Router();


route.get('/getBook', bookController.getListBook);
route.post('/addBook', bookController.addNewBook);
route.post('/deleteBook', bookController.deleteBook);
route.post('/editBook', bookController.editBook);

route.get('/', (req, res, next) => {
    res.send('Book hello');
})


module.exports = route;