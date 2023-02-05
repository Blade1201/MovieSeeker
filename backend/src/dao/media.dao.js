import MediaModel from "../model/media.model.js";
import getConnectionService from "../services/getConnection.service.js";


class MediaDao {
    findByImdb(imdbId) {
        return MediaModel.findOne({
            where: {
                imdbId
            }
        });
    }

    async create(values) {
        const transaction = await getConnectionService().transaction();
        try {
            const result = await MediaModel.create(values, {transaction});
            await transaction.commit();
            return result;
        } catch (e) {
            console.error(e);
            await transaction.rollback();
            return false;
        }
    }
}

export default MediaDao;