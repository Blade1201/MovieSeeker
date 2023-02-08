import FavoriteModel from "../model/favorite.model.js";
import getConnection from "../services/getConnection.service.js";

class FavoriteDao {
    async findByPk(user, media) {
        return await FavoriteModel.findOne({
            where: {
                UserId: user["id"],
                MediaId: media["id"]
            }
        });
    }

    async create(user, media) {
        const transaction = await getConnection().transaction();
        try {
            await FavoriteModel.create({UserId: user["id"], MediaId: media["id"]}, {transaction});
            await transaction.commit();
            return true;
        } catch (e) {
            console.error(e);
            await transaction.rollback();
            return false;
        }
    }

    async delete(favorite) {
        const transaction = await getConnection().transaction();
        try {
            await favorite.destroy({transaction});
            await transaction.commit();
            return true;
        } catch (e) {
            console.error(e);
            await transaction.rollback();
            return false;
        }
    }

    async findByUser(user) {
        return user.getFavoriteMedia();
    }
}

export default FavoriteDao;