const Sequelize = require('sequelize');
const Service = sequelize.define('service', {
	serviceid: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	salonid: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},

	name: Sequelize.STRING(50),

	price: Sequelize.INTEGER,

	status: Sequelize.INTEGER,

	avatar: Sequelize.STRING,
});

module.exports = Service;
