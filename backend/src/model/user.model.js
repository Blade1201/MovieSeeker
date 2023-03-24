import {DataTypes, Model} from "sequelize";
import getConnection from "../services/getConnection.service.js";
const sequelize = getConnection();

class UserModel extends Model {
    async hasTheEligibilityToModifyComment(comment) {
        if (this["rank"] === "A") {
            return true;
        }
        const hasComment = await this.hasComment(comment);
        return !!hasComment;
    }
}

UserModel.init({
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
    rank: {
        type: DataTypes.ENUM('U', 'A'),
        allowNull: false,
        defaultValue: "U"
    },
    avatarPath: {
        type: DataTypes.STRING(32),
        defaultValue: null
    }
}, {
    sequelize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name,
    paranoid: true
});

export default UserModel;

