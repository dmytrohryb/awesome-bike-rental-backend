const {DataTypes} = require('sequelize');

module.exports = sequelize => {
    const attributes = {
        discountPrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        countHours: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
    const options = {
        tableName: "orders",
        timestamps: false
    };
    const orderModel = sequelize.define("orders", attributes, options);
    return orderModel;
};

