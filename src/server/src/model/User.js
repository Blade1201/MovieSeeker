const {DataTypes, Model} = require('sequelize');
const currentConnection = require("../services/ConnectionManager");
const UserRanks = require("./UserRank");
const sequelize = currentConnection();

class User extends Model {
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hash: {
        type: DataTypes.CHAR(60).BINARY,
        allowNull: false,
    },
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
});

UserRanks.hasOne(User, {
    foreignKey: {
        name: "rank",
        defaultValue: 1
    },
    onUpdate: "RESTRICT",
    onDelete: "RESTRICT"
});

module.exports = User;

