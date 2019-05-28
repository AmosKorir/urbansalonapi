'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('orders', {
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

			createdAT: Sequelize.DATE,

			updatedAt: Sequelize.DATE,
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('orders');
	},
};
