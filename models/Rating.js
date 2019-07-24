const Sequelize = require('sequelize');
const Rate = sequelize.define('rate', {
	ratid: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	rating: sequelize.INTEGER,

	serviceid: sequelize.STRING,

	customerid: sequelize.STRING,
});

module.exports=Rate