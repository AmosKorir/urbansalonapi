const express = require('express');
const Rating = require('../models/Rating');
const router = express.Router();
const handler = require('../utils/Errorhandler');
const Service = require('./../models/Service');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// rate a service

router.post('/rate', (req, res) => {
	var userId = handler.validateAccessToken(req, res);
	var serviceid = req.body.serviceid;
	var rating = req.body.rating;

	Rating.create({
		customerid: userId,
		serviceid: serviceid,
		rating: rating,
	})
		.then(response => {
			Rating.findAll({
				where: {
					serviceid: serviceid,
				},
				attributes: [[Sequelize.fn('SUM', Sequelize.col('rating')), 'total']],
			}).then(response=>{
                
            })
			return res.json({
				success: {
					status: true,
				},
			});
		})
		.catch(error => handler.handleError(res, 500, error.message));
});

module.exports = router;
