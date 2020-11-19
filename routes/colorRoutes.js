const express = require('express')
const colorController = require('./../controllers/colorController')

const route = express.Router();

route.get('/', colorController.getAll);

module.exports = route;