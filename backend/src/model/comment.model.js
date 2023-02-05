import {DataTypes, Model} from "sequelize";
import currentConnection from "../services/getConnection.service.js";

const sequelize = currentConnection();

class CommentModel extends Model {}

CommentModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(1024),
            allowNull: false
        },
        parentId: {
            type: DataTypes.INTEGER,
            defaultValue: null
        }
    },
    {
        sequelize, // We need to pass the connection instance
        modelName: "Comment",
        paranoid: true
    });

export default CommentModel;