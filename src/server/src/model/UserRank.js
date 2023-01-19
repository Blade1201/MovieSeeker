const {DataTypes, Model} = require('sequelize');
const currentConnection = require("../services/ConnectionManager");
const sequelize = currentConnection();

class UserRank extends Model {}

UserRank.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'UserRank', // We need to choose the model name
    tableName: "user_ranks"
});

module.exports = UserRank;