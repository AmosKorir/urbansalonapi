const Sequelize=require('sequelize');
 

module.exports=sequelize.define("customer",{
       id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },

    name:Sequelize.STRING(300),

    phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
        primaryKey: true,
    },
   

    password:Sequelize.STRING(255)
}); 