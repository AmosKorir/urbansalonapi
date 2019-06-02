'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('services', {
			serviceid: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			salonid: {
				type: Sequelize.STRING,
				allowNull: false,
			},

			name: Sequelize.STRING(50),

			price: Sequelize.INTEGER,

			status: Sequelize.INTEGER,

			avatar: Sequelize.STRING,

			createdAt: Sequelize.DATE,

			updatedAt: Sequelize.DATE,
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('services');
	},
};
