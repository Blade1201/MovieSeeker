const {DataTypes, Model} = require('sequelize');
const currentConnection = require("../services/ConnectionManager");
const sequelize = currentConnection();

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    hash: {
        type: DataTypes.CHAR(60).BINARY,
        allowNull: false,
    },
    type: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: "F",
    },

}, {
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
    indexes: [
        {
            unique: true,
            fields: ["email"]
        },
        {
            unique: true,
            fields: ["username"]
        },
    ]
});

User.sync({alter: true});

module.exports = User;

