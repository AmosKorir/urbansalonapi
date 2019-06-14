const express = require('express');
const router = express.Router();
const handler = require('../utils/Errorhandler');
const Salon = require('./../models/Salon');
const Service = require('./../models/Service');
const Customer = require('./../models/Customer');
var multer = require('multer');
const { check, validationResult } = require('express-validator/check');
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/images');
	},
	filename: (req, file, cb) => {
		console.log(file);
		var filetype = '';
		if (file.mimetype === 'image/gif') {
			filetype = 'gif';
		}
		if (file.mimetype === 'image/png') {
			filetype = 'png';
		}
		if (file.mimetype === 'image/jpeg') {
			filetype = 'jpg';
		}
		cb(null, 'image-' + Date.now() + '.' + filetype);
	},
});
var upload = multer({ storage: storage });

router.post('/upload/salon', upload.single('file'), function(req, res, next) {
	var userId = handler.validateAccessToken(req, res);
	console.log(req.file);
	if (!req.file) {
		return handler.handleError(res,500,"file is empty");
	}
	Salon.update({ avatar: req.file.path }, { where: { salonid: userId } })
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
	var userId = req.body.serviceid;
	console.log(req.file);
	if (!req.file) {
		return handler.handleError(res, 500, "file is empty");
	}
	Salon.update({ avatar: req.file.path}, { where: { serviceid: userId } })
		.then(success =>
			res.json({
				success: {
					status: true,
				},
			})
		)
		.catch(error => handler.handleError(res, 500, error.message));
});

router.post('/upload/customer', upload.single('file'), function(req, res, next) {
	var userId = handler.validateAccessToken(req, res);
	console.log(req.file);
	if (!req.file) {
		return handler.handleError(res, 500,"send upload file")
	}
	Customer.update({ avatar: req.file.path }, { where: { customerid: userId } })
		.then(success =>
			res.json(success))
		.catch(error => handler.handleError(res, 500, error.message));
});

module.exports = router;
