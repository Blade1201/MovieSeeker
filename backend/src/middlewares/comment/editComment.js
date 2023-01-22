const CommentDAO = require("../../services/dao/CommentDAO");
const editComment = async (req, res, next) => {
    const result = await new CommentDAO().update(req.body.comment, req.body.content);

    if (result) {
        next();
    } else {
        res.status(500).json({success: false, blameUser: false, reason: "Hiba történt az adatbázis kapcsolat közben."});
    }
}

module.exports = editComment;