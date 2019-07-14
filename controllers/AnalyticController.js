const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const handler = require('../utils/Errorhandler');
const Service = require('./../models/Service');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//get booking for the past seven dates
router.get('/seven', (req, res) => {
	var startDate = dater(4);
	var endDate = new Date();
	console.log(startDate + endDate);

	priceDalytic(
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
//get booking count
const dateAnalytic = function getDateAnalytic(startdate, endDate, callback, errorCallback) {
	Order.findAll({
		where: {
			datebooked: {
				[Op.between]: [startdate, endDate],
			},
		},
		attributes: [[Sequelize.literal(`DATE("datebooked")`), 'date'], [Sequelize.literal(`COUNT(*)`), 'count']],
		group: ['date'],
	})
		.then(result => {
			callback(result);
		})
		.catch(error => {
			errorCallback(error);
		});
};

//get most earning day
const priceDatalytic = function getTotalPricelytic(startdate, endDate, callback, errorCallback) {
	Order.findAll({
		where: {
			datebooked: {
				[Op.between]: [startdate, endDate],
			},
		},
		include: [
			{
				model: Service,
				as: 'service',
			},
		],
        attributes: [[Sequelize.literal(`DATE("datebooked")`), 'date'], 
        [Sequelize.literal(`COUNT(*)`), 'count'],
            [sequelize.fn('sum', sequelize.col('price')), 'total']
    ],
		group: ['order.datebooked','service.serviceid'],
	})
		.then(result => {
			callback(result);
		})
		.catch(error => {
			errorCallback(error);
		});
};
const priceDalytic = function getTotalPricelytic(startdate, endDate, callback, errorCallback) {
    Order.findAll({
        where: {
            datebooked: {
                [Op.between]: [startdate, endDate],
            },
        },
        // include: [
        //     {
        //         model: Service,
        //         as: 'service',
        //     },
        // ],
        attributes: [Service.price,[Sequelize.literal(`DATE("datebooked")`), 'date'],
        [Sequelize.literal(`COUNT(*)`), 'count'],
        [sequelize.fn('sum', sequelize.col('services.price')), 'total']
        ],
        group: ['order.datebooked'],
    })
        .then(result => {
            callback(result);
        })
        .catch(error => {
            errorCallback(error);
        });
};

const dater = function getStartDate(dateRange) {
	var currentDate = new Date();
	var lastdate = currentDate.getDate() - 10;
	return lastdate;
};

module.exports = router;
