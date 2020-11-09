const { log } = require('console');
const logger = require('./utils/winston')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config();

const db = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then((con) => {
		logger.info('Connect to database on port=27017')
	});

const app = require('./app');

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    logger.info(`App running on port=${port} ...`)
})
