const Comment = require("../../model/Comment");
const getConnection = require("../getConnection");

class CommentDAO {
    async findById(id) {
        return await Comment.findByPk(id);
    }

    async findByParentId(parentId) {
        return await Comment.findAll({
            where: {parentId}
        })
    }

    async findByImdbId(imdbId) {
        return await Comment.findAll({
            where: {imdbId}
        })
    }

    async findByUser(user) {
        return user.getComments();
    }

    async create(user, imdbId, content, parentId) {
        const transaction = await getConnection().transaction();
        try {
            await user.createComment({imdbId, content, parentId}, {transaction});
            await transaction.commit();
            return true;
        } catch (e) {
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

module.exports = CommentDAO;
