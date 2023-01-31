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
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        imdbId: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        content: {
            type: DataTypes.STRING(1024),
            allowNull: false
        },
        dType: {
            type: DataTypes.ENUM("C", "R"),
            allowNull: false
        }
    },
    {
        sequelize, // We need to pass the connection instance
        modelName: "Comment",
    });


export default CommentModel;