const express = require('express');
const dotenv = require('dotenv');
const db = require('./db');
const morgan = require('morgan');
const httpErrors = require('http-errors');
const authRoute = require('./Routes/auth.route');
const categoryRoute = require('./Routes/category.route');
const productRoute = require('./Routes/product.route');
const stripeRoute = require('./Routes/stripe.route');
const cors = require('cors');
const multer = require('multer');
require('colors');
const path = require('path');
const { fileURLToPath } = require('url');

dotenv.config();

db()
    .then(() => {
        console.log('MongoDB è connesso'.green);
        app.listen(process.env.PORT, () => {
            console.log(`Server aperto nella porta ${process.env.PORT}`.green.underline)
        });
    })
    .catch(err => console.log(`Error in MongoDB, ${err}`.red));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/stripe', stripeRoute);

app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
})

app.use((req, res, next) => {
    next(httpErrors(404, 'Non trovato'));
});

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.send({
            status: 422,
            message: 'The size of the uploaded photo exceeds the maximum allowed size of 1 MB'
        });
    };
    if (err instanceof httpErrors.HttpError) {
        return res.send({
            status: err.status,
            message: err.message
        });
    };
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});