import CommentModel from "../model/comment.model.js";
import getConnection from "../services/getConnection.service.js";
import UserModel from "../model/user.model.js";

class CommentDao {
    async findById(id) {
        return await CommentModel.findByPk(id);
    }

    async findByMediaId(mediaId) {
        const comments = await CommentModel.findAll({
            where: {
                MediaId: mediaId,
                parentId: null
            },
            include: [UserModel, {
                model: CommentModel,
                as: "Replies",
                include: UserModel
            }]
        });

        const results = [];

        for (const comment of comments) {
            const {id, content: body, UserId: userId, parentId, createdAt} = comment;
            const username = comment["User"]["username"];
            results.push({id, body, username, userId, parentId, createdAt});

            for (const reply of comment["Replies"]) {
                const {id, content: body, UserId: userId, parentId, createdAt} = reply;
                const username = reply["User"]["username"];
                results.push({id, body, username, userId, parentId, createdAt});
            }
        }

        return results;
    }

    async findByUser(user) {
        return user.getComments();
    }

    async create(userId, mediaId, content, parentId) {
        const transaction = await getConnection().transaction();
        try {
            await CommentModel.create({content, parentId, MediaId: mediaId, UserId: userId}, {transaction});
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
}

export default CommentDao;
