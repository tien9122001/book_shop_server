const { readFile, writeFile } = require('../helpers/jsonfile')


class Book {
    async getListBook(req, res, next) {
        try {
            const data = await readFile('../../json/Book.json');
            res.json(data);
            next();
        } catch (error) {
            next(error);
        }
    }


    async addNewBook(req, res, next) {
        const { 
            title, image, description
        } = req.body;

        try {
            const data = {
                image, title, description
            }
            await writeFile('../../json/Book.json', data);
            next();
        } catch (error) {
            next(error);
        }

    }

    async deleteBook(req, res, next) {
        res.send('deleteBook');
    }

    async editBook(req, res, next) {
        res.send('editBook');
    }
}


module.exports = new Book();