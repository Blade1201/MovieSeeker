import {DataTypes, Model} from "sequelize";
import currentConnection from "../services/getConnection.service.js";

const sequelize = currentConnection();

class FavoriteModel extends Model {}

FavoriteModel.init({
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
    modelName: "Favorite",
    updatedAt: false
});

export default FavoriteModel;