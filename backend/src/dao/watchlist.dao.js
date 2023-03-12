import WatchlistModel from "../model/watchlist.model.js";
import UserModel from "../model/user.model.js";
import getConnection from "../services/getConnection.service.js";

class WatchlistDao {
    findByUserId(userId) {
        return UserModel.findByPk(userId, {
            include: "watchlistMedia"
        }
        );
    }

    findByPk(user, media) {
        return WatchlistModel.findOne({
            where: {
                UserId: user["id"],
                MediaId: media["id"]
            }
        })
    }

    async create(user, media, watched) {
        const transaction = await getConnection().transaction();
        try {
            await WatchlistModel.create({UserId: user["id"], MediaId: media["id"], watched}, {transaction})
            await transaction.commit();
            return true;
        } catch (e) {
            console.error(e);
            await transaction.rollback();
            return false;
        }
    }

    async update(watchList, watched) {
        const transaction = await getConnection().transaction();
        try {
            watchList["watched"] = watched;
            await watchList.save({transaction});
            await transaction.commit();
            return true;
        } catch (e) {
            console.error(e);
            await transaction.rollback();
            return false;
        }
    }
}

export default WatchlistDao;