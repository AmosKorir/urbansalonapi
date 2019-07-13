const express = require('express');
const router = express.Router();
const handler = require('../utils/Errorhandler');
const Salon = require('./../models/Salon');
const Service = require('./../models/Service');
const Customer = require('./../models/Customer');
const salonGraph = require('./../recommender/Recommender');
var filename;
var filetype = '';
var serviceAccount = require('./../config/database/');
var admin = require('firebase-admin');
var bucketName = 'gs://mapenzi-1481b.appspot.com';
const serviceAccount = require('./../config/mapenzi-1481b-firebase-adminsdk-7ayfn-1e0afd8b75.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://mapenzi-1481b.firebaseio.com',
	storageBucket: '//mapenzi-1481b.appspot.com',
});


var multer = require('multer');
var filename;
var bucket = admin.storage().bucket(bucketName);
const { check, validationResult } = require('express-validator/check');
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/images');
	},
	filename: (req, file, cb) => {
		console.log(file);
		var filetype = 'jpg';
		if (file.mimetype === 'image/gif') {
			filetype = 'gif';
		}
		if (file.mimetype === 'image/png') {
			filetype = 'png';
		}
		if (file.mimetype === 'image/jpeg') {
			filetype = 'jpg';
		}
		filename = 'image-' + Date.now() + '.' + filetype;
		cb(null, filename);
	},
});
var upload = multer({ storage: storage });

router.post('/upload/salon', upload.single('file'), function(req, res, next) {
	var userId = handler.validateAccessToken(req, res);
	console.log(req.file);
	if (!req.file) {
		return handler.handleError(res,500,"file is empty");
	}
	Salon.update({ avatar: filename }, { where: { salonid: userId } })
		.then(success =>
			res.json({
				success: {
					status: true,
				},
			})
		)
		.catch(error => handler.handleError(res, 500, error.message));
});

router.post('/upload/service', upload.single('file'), function(req, res, next) {
	var serviceidd = req.body.serviceid;
	if (!req.file) {
		return handler.handleError(res, 500, "file is empty");
	}
	bucket.upload(req.file.path,{
		destination: 'directory/images/' + filename, public: true
	}, (err, file) => {

		if(!err){
			Service.update({ avatar: filename }, { where: { serviceid: serviceidd } })
				.then(response => {
					var jsonString = JSON.stringify(response); //convert to string to remove the sequelize specific meta data
					var obj = JSON.parse(jsonString);
					// salonGraph.insertServiceGraph(obj);
					console.log(jsonString);
					res.json({
						success: {
							status: true,
						},
					})
				}
				)
				.catch(error => handler.handleError(res, 500, error.message));
		}else{
			handler.handleError(res,500,err);
		}
	});
	
});

router.post('/upload/customer', upload.single('file'), function(req, res, next) {
	var userId = handler.validateAccessToken(req, res);
	console.log(req.file);
	if (!req.file) {
		return handler.handleError(res, 500,"send upload file")
	}
	Customer.update({ avatar: filename }, { where: { customerid: userId } })
		.then(success =>
			res.json(success))
		.catch(error => handler.handleError(res, 500, error.message));
});

module.exports = router;
