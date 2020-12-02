/** @format */

const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./../models/productModel');
const User = require('./../models/userModel');
const Brand = require('../models/brandModel.js');
const Color = require('../models/colorModel');
const Category = require('../models/categoryModel');
const Comment = require('../models/commentModel');
const bcrypt = require('bcryptjs');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log('DB connection successful!'));

// READ JSON FILE
const comments = JSON.parse(fs.readFileSync(`${__dirname}/comments.json`, 'utf-8'))
const categories = JSON.parse(fs.readFileSync(`${__dirname}/categories.json`, 'utf-8'));
const brands = JSON.parse(fs.readFileSync(`${__dirname}/brands.json`, 'utf-8'));
const colors = JSON.parse(fs.readFileSync(`${__dirname}/colors.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
	try {
		await Brand.create(brands);
		await Color.create(colors);
		await Category.create(categories);
		await Product.create(products);
		await Comment.create(comments);
		let password = 'user123';
		for (let i in users) {
			let salt = await bcrypt.genSalt(10);
			let hashedPassword = await bcrypt.hash(password, salt);
			users[i].password = hashedPassword;
		}
		await User.create(users);
		console.log('Data successfully loaded!');
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
	try {
		await User.deleteMany();
		await Product.deleteMany();
		await Brand.deleteMany();
		await Color.deleteMany();
		await Category.deleteMany();
		await Comment.deleteMany();
		console.log('Data successfully deleted!');
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

if (process.argv[2] === '--import') {
	importData();
} else if (process.argv[2] === '--delete') {
	deleteData();
}
