const Sequelize = require('sequelize');
const Order = require('./Order');

const Customer = sequelize.define('customer', {
	customerid: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},

	name: Sequelize.STRING(300),

	phone: {
		type: Sequelize.STRING(20),
		allowNull: false,
		primaryKey: true,
	},

	password: Sequelize.STRING(255),
});
Order.belongsTo(Customer, { foreignKey: 'customerid' }); 
Customer.hasMany(Order, { as: 'orders', foreignKey: 'customerid' });

module.exports = Customer;
