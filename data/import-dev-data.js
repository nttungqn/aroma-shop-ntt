/**  */

const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./../models/productModel');
const User = require('./../models/userModel');
const Brand = require('../models/brandModel.js');
const Color = require('../models/colorModel');
const Category = require('../models/categoryModel');
const bcrypt = require('bcryptjs');

dotenv.config({ path: '.env' });

const DB = process.env.DATABASE_ONLINE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD_ONLINE);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => console.log('DB connection successful!'));

// READ JSON FILE
const categories = JSON.parse(fs.readFileSync(`${__dirname}/category.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/user.json`, 'utf-8'));
const brands = JSON.parse(fs.readFileSync(`${__dirname}/brand.json`, 'utf-8'));
const colors = JSON.parse(fs.readFileSync(`${__dirname}/color.json`, 'utf-8'));
const products = JSON.parse(fs.readFileSync(`${__dirname}/product.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
	try {
		await Brand.create(brands);
		await Color.create(colors);
		await Category.create(categories);
		let password = 'user123';
		for (let i in users) {
			let salt = await bcrypt.genSalt(10);
			let hashedPassword = await bcrypt.hash(password, salt);
			users[i].password = hashedPassword;
		}
		await User.create(users);
		await Product.create(products);
		console.log('Data successfully loaded!');
	} catch (err) {
		console.log(err);
	}
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
	try {
		await User.deleteMany();
		await Brand.deleteMany();
		await Color.deleteMany();
		await Category.deleteMany();
		await Product.deleteMany();
		console.log('Data successfully deleted!');
	} catch (err) {
		console.log(err);
	}
};

if (process.argv[2] === '--import') {
	importData();
} else if (process.argv[2] === '--delete') {
	deleteData();
} else if(process.argv[2] === '--restart'){
	deleteData();
	importData();
}
process.exit();
