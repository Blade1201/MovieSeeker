const CommentDAO = require("../../services/dao/CommentDAO");
exports.deleteComment = async (req, res, next) => {
    const result = await new CommentDAO().delete(req.body.comment);

    if (result) {
        next();
    } else {
        res.status(500).json({success: false, blameUser: false, reason: "Hiba történt az adatbázis kapcsolat közben."});
    }
}