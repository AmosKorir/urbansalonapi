const express = require('express');
const router = express.Router();
const handler = require('../utils/Errorhandler');
const salonGraph = require('./../recommender/Recommender')
const Service = require('./../models/Service');
const Salon = require('./../models/Salon');
const { check, validationResult } = require('express-validator/check');

//creates a service
router.post(
	'/create',
	[
		check('name')
			.not()
			.isEmpty(),
		check('price')
			.not()
			.isEmpty()
			.isInt(),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		var userId = handler.validateAccessToken(req, res);

		Service.create({
			salonid: userId,
			name: req.body.name,
			price: req.body.price,
			status: '0',
		})
			.then(response =>{ 
				var jsonString = JSON.stringify(response); //convert to string to remove the sequelize specific meta data
				var obj = JSON.parse(jsonString);
				salonGraph.insertServiceGraph(obj);
				console.log(jsonString);
				return res.json(response);
					
			})
			.catch(error => handler.handleError(res, 500, error.message));
	}
);

//get all the service by salon

router.get('/salon_self', (req, res) => {
	var userId = handler.validateAccessToken(req, res);
	Service.findAll({
		where: {
			salonid: userId,
		},
		include: [
			{
				model: Salon,
				as: 'salon',
				attributes: { exclude: ['password'] },
			},
		],
	})
		.then(response =>{
			res.json(response);
		})
		.catch(error => handler.handleError(res, 500, error.message));
});

// function to get all the services
router.get('/all', (req, res) => {
	Service.findAll()
		.then(response => res.json(response))
		.catch(error => handler.handleError(res, 500, error.message));
});
module.exports = router;
