const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
require('./config/database/database');

const http = require('http');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var publicDir = require('path').join(__dirname, '/public');
app.use('/view', express.static(publicDir)); 
var where = require('node-where');

app.use(function (req, res, next) {
	where.is(req.ip, function (err, result) {
		req.geoip = result;
		next();
	});
});
 
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
app.use('loadimage', express.static(path.join(__dirname, 'public/images')));
app.use('/viewimage', express.static(path.join(__dirname, 'public/images')));

const port = parseInt(process.env.PORT, 10) || 8201;

app.set('port', port);

const server = http.createServer(app);

server.listen(process.env.PORT || port, function() {
	console.log('Your node js server is running');
});

module.exports = app;
