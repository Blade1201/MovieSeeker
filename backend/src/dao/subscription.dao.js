import SubscriptionModel from "../model/subscription.model.js";
import getConnection from "../services/getConnection.service.js";

class SubscriptionDao {
    findUserLatestSubscription(user) {
        return SubscriptionModel.findOne({
            where: {
                UserId: user["id"],
            },
            order: [["id", "DESC"]]
        })
    }

    async create(user, type) {
        const transaction = await getConnection().transaction();
        try {
            await SubscriptionModel.create({UserId: user["id"], type}, {transaction});
            await transaction.commit();
            return true;
        } catch (e) {
            console.error(e);
            await transaction.rollback();
            return false;
        }
    }
}
export default SubscriptionDao;
