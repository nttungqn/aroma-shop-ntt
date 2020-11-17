const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DB = process.env.DATABASE_ONLINE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD_ONLINE);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then((con) => {
		console.log('DB connection successfull');
	});

const app = require('./app.js');

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
	console.log(`App running on ${port}...`);
});
