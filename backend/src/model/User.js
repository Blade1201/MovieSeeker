const {DataTypes, Model} = require('sequelize');
const getConnection = require("../services/getConnection");
const sequelize = getConnection();

class User extends Model {
    async hasTheRightToModifyComment(comment) {
        const hasComment = await this.hasComment(comment);

        if (hasComment) {
            return true;
        }
        const rank = await this.getRank();

        return rank["name"] === "Admin";
    }
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
    modelName: "User", // We need to choose the model name
});

module.exports = User;

