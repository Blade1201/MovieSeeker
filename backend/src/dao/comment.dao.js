import CommentModel from "../model/comment.model.js";
import getConnection from "../services/getConnection.service.js";
import UserModel from "../model/user.model.js";

class CommentDao {
    async findById(id) {
        return await CommentModel.findByPk(id);
    }

    async findByImdbId(imdbId) {
        const comments = await CommentModel.findAll({
            where: {
                imdbId,
                dType: "C",
            },
            include: UserModel
        });

        const commentsId = comments.map(comment => comment["id"]);

        const replies = await CommentModel.findAll({
            where: {
                parentId: commentsId
            },
            include: UserModel
        });

        return comments.concat(replies);
    }

    async findByUser(user) {
        return user.getComments();
    }

    async create(user, imdbId, content, parentId, dType) {
        const transaction = await getConnection().transaction();
        try {
            await CommentModel.create({imdbId, content, parentId, dType, UserId: user["id"]}, {transaction});
            await transaction.commit();
            return true;
        } catch (e) {
            console.error(e);
            await transaction.rollback();
            return false;
        }
    }


    async update(comment, content) {
        const transaction = await getConnection().transaction();
        try {
            comment["content"] = content;
            await comment.save({transaction});
            await transaction.commit();
            return true;
        } catch (e) {
            await transaction.rollback();
            return false;
        }
    }

    async delete(comment) {
        const transaction = await getConnection().transaction();
        try {
            await comment.destroy({transaction});
            await transaction.commit();
            return true;
        } catch (e) {
            await transaction.rollback();
            return false;
        }
    }

    async save(comment) {
        return await comment.save();
    }
}

export default CommentDao;
