const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const handler = require('../utils/Errorhandler');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


//get booking for the past seven dates
router.get('/seven', (req, res) => {
	var startDate = dater(4);
    var endDate = new Date();
    console.log(startDate+endDate);

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
            datebooked: {
				[Op.between]: [startdate, endDate],
			},
        },
        group: ["datebooked"],
	})
		.then(result => {
			callback(result);
		})
		.catch(error => {
			errorCallback(error);
		});
};

const dater=function getStartDate(dateRange) {
    var currentDate = new Date();
    var lastdate = currentDate.getDate() - 10;
	return lastdate;
}

module.exports=router;