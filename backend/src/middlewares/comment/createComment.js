const CommentDAO = require("../../services/dao/CommentDAO");

const createComment = async (req, res, next) => {
    const {user, imdbId, content} = req.body;
    const parentId = req.body.parentId ?? null;

    const result = await new CommentDAO().create(user, imdbId, content, parentId);
    if (result) {
        next();
    } else {
        res.status(500).json({success: false, blameUser: false, reason: "Hiba történt az adatbázis kapcsolat közben."});
    }
};
module.exports = createComment;