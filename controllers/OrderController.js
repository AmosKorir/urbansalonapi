const express = require('express');
const Order = require('../models/Order');
const Customer = require('./../models/Customer');
const Service = require('./../models/Service');
const Salon = require('./../models/Salon');
const router = express.Router();
require('./../models/Relationship')


//create order

router.post('/', (req, res) => {
	Order.create({
		orderno: Math.floor(1000 + Math.random() * 9000),
		serviceid: req.body.serviceid,
		customerid: req.body.customerid,
		timebooked: req.body.timebooked,
		datebooked: req.body.datebooked,
	})
		.then(success =>
			res.json({
				success: {
					status: true,
				},
			})
		)
		.catch(error => {
			res.status(error.status || 402);
			res.json({
				error: {
					message: error.message,
				},
			});
		});
});

//get all the th orders

router.get('/all', (req, res) => {
	Order.findAll()
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

//get order by customerId
router.get('/customer', (req, res) => {
	Order.findAll({
		where: {
			customerid: req.query.userId,
		},

		include: [
			{
				model: Service,
				as: 'service',
				include: [
					{
						model: Salon,
						as: 'salon',
						attributes: { exclude: ['password'] },
					},
				],
			},
			{
				model: Customer,
				as: 'customer',
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

//get orders by salon id
router.get('/salon', (req, res) => {
	Order.findAll({
		where: {
			salonid: req.query.salonid,
		},
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
