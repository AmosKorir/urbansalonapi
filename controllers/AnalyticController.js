const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const handler = require('../utils/Errorhandler');

//get booking for the past seven dates
router.post('/seven', (req, res) => {
	var startDate = req.startDate;
	var endDate = req.endDate;
	dateAnalytic(
		startDate,
		endDate,
		result => {
            res.json(result);
        },
		error => {
			handler.handleError(res, 500, error.message);
		}
	);
});

const dateAnalytic = function getDateAnalytic(startdate, endDate, callback, errorCallback) {
	Order.findAll({
		where: {
			created_at: {
				$between: [startdate, endDate],
			},
		},
	})
		.then(result => {
			callback(result);
		})
		.catch(error => {
			errorCallback(error);
		});
};
