const Sequelize = require('sequelize');
const Customer = require('./Customer');

const Order = sequelize.define('order', {
	orderid: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	salonid: {
		type: Sequelize.STRING(300),
		allowNull: false,
	},
	orderno: {
		type: Sequelize.STRING(20),
		allowNull: false,
	},
	customerid: {
		type: Sequelize.STRING(300),
		allowNull: false,
	},
});


module.exports = Order;
