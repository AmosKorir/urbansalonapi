const express = require('express');
const router = express.Router();
const Salon = require('./../models/Salon');
const Service = require('./../models/Service');
const Order = require('./../models/Order');

//register salon
router.post('/register', (req, res) => {
	Salon.create({
		name: req.body.name,
		phone: req.body.phone,
		password: req.body.password,
		location: req.body.location,
		latitude: req.body.latitude,
		longitude: req.body.longitude,
	})
		.then(user => res.json(user))
		.catch(error => {
			res.status(error.status || 402);
			res.json({
				error: {
					message: error.message,
				},
			});
		});
});

//login salon
router.post('/login', (req, res) => {
	Salon.findAll({
		where: {
			phone: req.body.phone,
			password: req.body.password,
		},
	}).then(response=>res.json(response));
});




module.exports = router;
