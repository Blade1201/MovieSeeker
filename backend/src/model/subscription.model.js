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
        type: DataTypes.VIRTUAL,
        get() {
            const endAt = new Date(this.createdAt);
            const days = SUBSCRIBE_PERIOD_TO_DAYS[this.type];
            endAt.setDate(endAt.getDate() + days);
            return endAt;
        }
    }
}, {
    sequelize,
    modelName: "Subscription",
    timestamps: false,
});

export default SubscriptionModel;