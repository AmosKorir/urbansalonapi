const express = require('express');
const Order = require('../models/Order');
const Customer = require('./../models/Customer');
const router = express.Router();
Order.belongsTo(Customer, { foreignKey: 'customerid' });
//create order

router.post('/', (req, res) => {
	Order.create({
		orderno: Math.floor(1000 + Math.random() * 9000),
		salonid: req.body.salon_id,
		customerid: req.body.customer_id,
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
				model: Customer,
				as: 'customer',
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
