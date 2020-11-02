const {DataTypes} = require('sequelize');

module.exports = sequelize => {
    const attributes = {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        available: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    };
    const options = {
        tableName: "bikes",
        timestamps: false
    };
    const bikeModel = sequelize.define("bikes", attributes, options);
    return bikeModel;
};
