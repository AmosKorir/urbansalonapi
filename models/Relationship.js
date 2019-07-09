const Service = require('./Service');
const Salon = require('./Salon');
const Customer = require('./Customer');
const Order = require('./Order');

Service.belongsTo(Salon, { foreignKey: 'salonid' });
Salon.hasMany(Service, { foreignKey: 'salonid' });

Order.belongsTo(Service, { foreignKey: 'serviceid' });
Service.hasMany(Order, { foreignKey: 'serviceid' });

Order.belongsTo(Customer, { foreignKey: 'customerid' });
Customer.hasMany(Order, { as: 'orders', foreignKey: 'customerid' });


