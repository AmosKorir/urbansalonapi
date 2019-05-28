'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 return queryInterface.createTable("customers",{
    id:{
      type:Sequelize.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
  },

  name:Sequelize.STRING(300),

  phone:Sequelize.STRING(30),

  password:Sequelize.STRING(255),

  createdAT:Sequelize.DATE,

  updatedAt:Sequelize.DATE

  })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("customers");
  }
};
