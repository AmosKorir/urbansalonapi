const express = require('express');
const Customer = require('./../models/Customer');
const Order=require('./../models/Order');
const router = express.Router();

const errorHander = err => {
	console.error('Error', err);
};
router.post('/', (req, res) => {
	Customer.create({
		name: req.body.name,
		phone: req.body.phone,
		password: req.body.password,
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

router.post('/login', (req, res) => {
	Customer.findAll()
		.then(user => res.json(user))
		.catch(error => {
			res.status(error.status || 402);
			res.json(error);
		});
});

router.get('/get_user', (req, res) => {
	Customer.findAll({
		where: {
			id: req.query.userId,
		},
	})
		.then(user => res.json(user))
		.catch(errorHander);
});

router.get('/orders', (req, res) => {
	Customer.findAll({
		where: {
			customerid: req.query.userId,
		},

		include:[
			{
				model:Order,
				as:"orders"
			}
		]
	})
		.then(user => res.json(user))
		.catch(errorHander);
});

router.get('/all', (req, res) => {
	Customer.findAll()
		.then(users => res.json(users))
		.catch(errorHander);
});

module.exports = router;
