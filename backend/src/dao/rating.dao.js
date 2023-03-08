import RatingModel from "../model/rating.model.js";
import getConnection from "../services/getConnection.service.js";
const sequelize = getConnection();

class RatingDao {
    findByPk(userId, mediaId) {
        return RatingModel.findOne({
            where: {UserId: userId, MediaId: mediaId}
        });
    }

    async create(userId, mediaId, rating) {
        const transaction = await getConnection().transaction();
        try {
            await RatingModel.create({MediaId: mediaId, UserId: userId, rating, media_id: mediaId}, {transaction});
            await transaction.commit();
            return true;
        } catch (e) {
            console.error(e);
            await transaction.rollback();
            return false;
        }
    }

    async update(rating, ratingScore) {
        const transaction = await getConnection().transaction();
        try {
            rating["rating"] = ratingScore;
            await rating.save({transaction});
            await transaction.commit();
            return true;
        } catch (e) {
            await transaction.rollback();
            return false;
        }
    }

    async delete(rating) {
        const transaction = await getConnection().transaction();
        try {
            await rating.destroy({transaction});
            await transaction.commit();
            return true;
        } catch (e) {
            await transaction.rollback();
            return false;
        }
    }

    async getAverageScore(media) {
        return RatingModel.findAll({
            where: {MediaId: media["id"]},
            attributes: [[sequelize.fn("avg", sequelize.col("rating")), 'avgScore']]
        });
    }

    async get(user, media) {
        return RatingModel.findOne({
            where: {MediaId: media["id"], UserId : user["id"]}
        });
    }
}

export default RatingDao;
