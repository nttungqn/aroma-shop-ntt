const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHandlebars = require('express-handlebars');
const compression = require('compression');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const paginate = require('express-handlebars-paginate');
const helmet = require('helmet');
const cors = require('cors');

const productRouter = require('./routes/productRoutes')
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const cartRouter = require('./routes/cartRoutes');
const brandRouter = require('./routes/brandRoutes');
const categoryRouter = require('./routes/categoryRoutes.js');
const Cart = require('./controllers/cartController');
const AppError = require('./utils/AppError');

const app = express();

app.enable('trust proxy');

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

app.use(cors());

// set view engine
const hbs = expressHandlebars.create({
	extname: 'hbs',
	defaultLayout: 'layout',
	layoutsDir: __dirname + '/views/layouts',
	partialsDir: __dirname + '/views/partials',
	handlebars: allowInsecurePrototypeAccess(Handlebars),
	helpers: {
		createPagination: paginate.createPagination,
	},
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use cookie-parser
app.use(cookieParser());

// use session
app.use(
	session({
		cookie: { httpOnly: true, maxAge: 3600 * 24 * 30 * 1000 },
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(morgan('dev'));

app.use(compression());

app.use((req, res, next) => {
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	req.session.cart = cart;
	res.locals.totalQuantity = cart.totalQuantity;
	res.locals.user = req.session.user ? req.session.user : {};
	res.locals.fullname = req.session.user ? req.session.user.fullname : '';
	res.locals.isLoggedIn = req.session.user ? true : false;
	next();
});

app.use('/', viewRouter);
app.use('/cart', cartRouter);
app.use('/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/brands', brandRouter);
app.use('/api/categories', categoryRouter);

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
