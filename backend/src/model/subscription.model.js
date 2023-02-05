import {DataTypes, Model} from "sequelize";
import currentConnection from "../services/getConnection.service.js";

const sequelize = currentConnection();

const SUBSCRIBE_PERIOD_TO_DAYS = {
    'M': 30,
    'S': 182,
    'A': 365
}
Object.freeze(SUBSCRIBE_PERIOD_TO_DAYS);

class SubscriptionModel extends Model {}


SubscriptionModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('M', 'S', 'A'),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    endAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Subscription",
    timestamps: false,
    hooks: {
        beforeValidate(sub) {
            const endAt = new Date(sub["createdAt"]);
            const days = SUBSCRIBE_PERIOD_TO_DAYS[sub["type"]];
            endAt.setDate(endAt.getDate() + days);
            sub["endAt"] = endAt;
        }
    }
});

export default SubscriptionModel;