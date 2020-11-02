const {DataTypes} = require('sequelize');

module.exports = sequelize => {
    const attributes = {
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    };
    const options = {
        tableName: "types",
        timestamps: false
    };
    const typeModel = sequelize.define("types", attributes, options);
    return typeModel;
};
