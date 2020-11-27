const mongoose = require('mongoose');
const dotenv = require('dotenv');
// get data from .env
dotenv.config({ path: './.env' });

// connect database
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then((con) => {
        console.log('DB connection successfull');
    });

const app = require('./app.js');

// recommend port 5000 for deploying heroku
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`App running on ${port}...`);
});

