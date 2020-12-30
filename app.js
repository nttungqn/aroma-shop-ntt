/** @format */

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
const passport = require('passport');
const flash = require('connect-flash')
const justHandlebarsHelpers = require('just-handlebars-helpers');

const viewRouter = require('./routes/viewRoutes');
const userRouter = require('./routes/userRoutes');
const commentRouter = require('./routes/commentRoutes');
const Cart = require('./controllers/cartController');
const cartRouter = require('./routes/cartRoutes');
const AppError = require('./utils/AppError');

const app = express();

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));


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

justHandlebarsHelpers.registerHelpers(Handlebars);

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use cookie-parser
app.use(cookieParser());

app.use(flash());

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

// passport
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	req.session.cart = cart
	res.locals.session = req.session;
	res.locals.totalQuantity = cart.totalQuantity;
	if(req.user)
		res.locals.user = req.user;

	next();
});



app.use('/', viewRouter);
app.use('/', userRouter)
app.use('/cart', cartRouter);
app.use('/comments', commentRouter);


// pass passport for configuration
require('./config/passport')(passport);

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
