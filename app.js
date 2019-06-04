const express = require('express');
require('./config/database/database');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

// This will be our application entry. We'll setup our server here.

const http = require('http');

// Set up the express app

const app = express();

// Log requests to the console.

app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
var publicDir = require('path').join(__dirname, '/public');
app.use(express.static(publicDir));

// Setup a default catch-all route that sends back a welcome message in JSON format.

//Db connection

// require('./controllers/customerController')();
const Customer = require('./controllers/customerController');
const Order = require('./controllers/OrderController');
const Salon = require('./controllers/SalonController');
const Service = require('./controllers/ServiceController');
const Image = require('./controllers/ImagUploadController');
const expressValidator = require('express-validator');
app.use(expressValidator());
require('./models/Relationship');
app.use('/customer', Customer);
app.use('/order', Order);
app.use('/salon', Salon);
app.use('/service', Service);
app.use('/image', Image);

app.get('/', (req, res) =>
	res.status(200).send({
		message: 'Welcome to the beginning of nothingness.',
	})
);

app.get('/avatar');

const port = parseInt(process.env.PORT, 10) || 8200;

app.set('port', port);

const server = http.createServer(app);

server.listen(process.env.PORT || port, function() {
	console.log('Your node js server is running');
});

module.exports = app;
