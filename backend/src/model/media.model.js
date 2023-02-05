import {DataTypes, Model} from "sequelize";
import currentConnection from "../services/getConnection.service.js";

const sequelize = currentConnection();

class MediaModel extends Model {
}

MediaModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        imdbId: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        tmdbType: {
            type: DataTypes.ENUM('M', 'T'),
            allowNull: false
        },
        tmdbId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        originalTitle: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        posterPath: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    },
    {
        sequelize, // We need to pass the connection instance
        modelName: "Media",
    });

export default MediaModel;