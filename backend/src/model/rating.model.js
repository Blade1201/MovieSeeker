import {DataTypes, Model} from "sequelize";
import currentConnection from "../services/getConnection.service.js";
import MediaModel from "./media.model.js";

const sequelize = currentConnection();

class RatingModel extends Model {}

RatingModel.init({
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
            model: MediaModel,
            key: "id",
        }
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Rating"
});

export default RatingModel;