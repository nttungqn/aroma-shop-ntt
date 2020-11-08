const { log } = require('console');
const logger = require('./utils/winston')
const dotenv = require('dotenv')

dotenv.config();

const app = require('./app');

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    logger.info(`App running on ${port}...`)
})