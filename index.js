const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
require('dotenv').config();
const route = require('./src/routes');
require('./src/helpers/redis_client')


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));
app.use(morgan('combined'));

route(app);

app.use('/resource', express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
    res.status(parseInt(err.status)).json({
        "error-message": err.message,
        "status": err.status || 500,
    })
})




app.listen(PORT, () => {
    console.log(`Listening on PORT::${PORT}`);
})






