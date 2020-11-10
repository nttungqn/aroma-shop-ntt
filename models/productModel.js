
const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
	{
		_id: {
			type: Number,
		},
		name: {
			type: String,
			trim: true,
			required: [true, 'A shoes must have a name'],
			maxlength: [50, 'A shoes name must have less or equal than 50 characters'],
			minlength: [3, 'A shoes name must have more or equal than 6 characters'],
		},
		slug: String,
		ratingsAverage: {
			type: Number,
			default: 4.5,
			min: [1, 'Rating must be above 1.0'],
			max: [5, 'Rating must be below 5.0'],
			set: (val) => Math.round(val * 10) / 10, 
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
		size: {
			type: [String],
			required: true,
		},
		price: {
			type: Number,
			required: [true, 'A shoes must have a price'],
		},
		description: {
			type: String,
		},
		summary: { type: String },
		imageCover: {
			type: String,
			required: [true, 'A shoes must have a image cover'],
		}
	},
);

productSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
