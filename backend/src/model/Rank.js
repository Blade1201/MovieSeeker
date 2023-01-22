const {DataTypes, Model} = require('sequelize');
const currentConnection = require("../services/getConnection");
const sequelize = currentConnection();

class Rank extends Model {}

Rank.init({
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
    modelName: "Rank", // We need to choose the model name
});

module.exports = Rank;