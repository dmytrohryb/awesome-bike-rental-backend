const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("deeva8bhtsj535", "raxppgvkflufhr", "94afd5ff4459e842de15bfc3ac84fdf98b2dd2a40b414d03d4bf05b958f456fe", {
    dialect: "postgres",
    port: 5432,
    host: 'ec2-54-247-118-139.eu-west-1.compute.amazonaws.com'
})

const Bike = require('./models/bike')(sequelize)
const Type = require('./models/type')(sequelize)
const Order = require('./models/order')(sequelize)

Type.hasMany(Bike)
Bike.belongsTo(Type)
Bike.hasMany(Order)
Order.belongsTo(Bike)

module.exports = {
    sequelize: sequelize,
    bike: Bike,
    type: Type,
    order: Order
}
