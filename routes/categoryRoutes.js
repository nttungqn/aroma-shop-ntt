const express = require('express');
const categoryController = require('./../controllers/categoryController')

const route = express.Router();

route.get('/', categoryController.getAll)

module.exports = route;