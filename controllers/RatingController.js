const express = require('express');
const router = express.Router();
const salonGraph = require('./../recommender/Recommender');
const handler = require('../utils/Errorhandler');
const Rating = require('./../models/Rating');
const Sequelize = require('sequelize');

// rating function
router.post('/', (req, res) => {
	var userId = handler.validateAccessToken(req, res);
	Rating.create({
		rating: req.body.rating,
		serviceid: req.body.serviceid,
		customerid: userId,

	})
		.then(success => {
			var jsonString = JSON.stringify(success); //convert to string to remove the sequelize specific meta data
			var obj = JSON.parse(jsonString);
			salonGraph.insertRatings(obj);
			return res.json(success);
		})
		.catch(error => handler.handleError(res, 422, error.message));


});

module.exports = router;