const express = require('express');
const router = express.Router();
const Service = require('./../models/Service');
const Salon = require('./../models/Salon');

//creates a service
router.post('/create', (req, res) => {
	Service.create({
		salonid: req.body.salonid,
		name: req.body.name,
		price: req.body.price,
		status: '0',
	})
		.then(response => res.json(response))
		.catch(error => {
			res.status(error.status || 402);
			res.json({
				error: {
					message: error.message,
				},
			});
		});
});

//get all the service by salon

router.get('/all', (req, res) => {
	Service.findAll({
		where: {
			salonid: req.query.salonid,
		},
		include: [
			{
				model: Salon,
				as: 'salon',
				attributes: { exclude: ['password'] },
			},
		],
	})
		.then(response => res.json(response))
		.catch(error => {
			res.status(error.status || 402);
			res.json({
				error: {
					message: error.message,
				},
			});
		});
});
module.exports = router;
