import CommentDao from "../dao/comment.dao.js";
import MediaDao from "../dao/media.dao.js";

const create = async (req, res, next) => {
    const {user, media, content} = req.body;
    const parentId = req.body.parentId ?? null;

    const result = await new CommentDao().create(user["id"], media["id"], content, parentId);
    if (result) {
        next();
    } else {
        res.status(500).json({success: false, blameUser: false, reason: "Hiba történt az adatbázis kapcsolat közben."});
    }
};

const edit = async (req, res, next) => {
    const result = await new CommentDao().update(req.body.comment, req.body.content);

    if (result) {
        next();
    } else {
        res.status(500).json({success: false, blameUser: false, reason: "Hiba történt az adatbázis kapcsolat közben."});
    }
}

const destroy = async (req, res, next) => {
    const result = await new CommentDao().delete(req.body.comment);

    if (result) {
        next();
    } else {
        res.status(500).json({success: false, blameUser: false, reason: "Hiba történt az adatbázis kapcsolat közben."});
    }
}

const get = async (req, res) => {
    const {imdbId} = req.params;
    const media = await new MediaDao().findByImdb(imdbId);

    if (!media) {
        res.json([]);
        return ;
    }

    const results = await new CommentDao().findByMediaId(media["id"]);

    if (results) {
        res.json(results);
    } else {
        res.status(500).json({success: false, blameUser: false, reason: "Hiba történt az adatbázis kapcsolat közben."});
    }

}

export {
    create,
    edit,
    destroy,
    get
}