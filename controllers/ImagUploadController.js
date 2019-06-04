const express = require('express');
const router = express.Router();
const handler = require('../utils/Errorhandler');
const Salon = require('./../models/Salon');
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
		res.status(500);
		return next(err);
	}
	Salon.update({ avatar: req.file.filename}, { where: { salonid: userId} })
		.then(salon => res.json(salon))
		.catch(error => handler.handleError(res, 500, error.message));
});

module.exports = router;
