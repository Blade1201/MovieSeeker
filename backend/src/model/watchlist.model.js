import {DataTypes, Model} from "sequelize";
import currentConnection from "../services/getConnection.service.js";

const sequelize = currentConnection();

class WatchlistModel extends Model {}

WatchlistModel.init({
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: "User",
            key: "id"
        }
    },
    MediaId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Media",
            key: "id",
        }
    },
    watched: {
        type: DataTypes.ENUM("Y", "N"),
        allowNull: false
    }

}, {
    sequelize,
    modelName: "Watchlist",
    updatedAt: true
});

export default WatchlistModel;