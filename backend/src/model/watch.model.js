import {DataTypes, Model} from "sequelize";
import currentConnection from "../services/getConnection.service.js";

const sequelize = currentConnection();

class WatchModel extends Model {}

WatchModel.init({
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
    }

}, {
    sequelize,
    modelName: "Watch",
    tableName: "watchlist",
    updatedAt: false
});

export default WatchModel;