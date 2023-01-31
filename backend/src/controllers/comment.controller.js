import CommentDao from "../dao/comment.dao.js";

const formatComments = (comments) => {
    const results = [];
    for (const comment of comments) {
        const {id, content : body, UserId: userId, parentId, createdAt, updatedAt} = comment;
        const username = comment["User"]["username"];
        results.push({id, body, username, userId, parentId, createdAt, updatedAt});
    }
    return results;
}


const create = async (req, res, next) => {
    const {user, content} = req.body;
    const parentId = req.body.parentId ?? null;
    let imdbId;
    let dType;

    if (parentId) {
        imdbId = null;
        dType = "R";
    } else {
        imdbId = req.body.imdbId;
        dType = "C";
    }

    const result = await new CommentDao().create(user, imdbId, content, parentId, dType);
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
    const results = await new CommentDao().findByImdbId(req.params.imdbId);

    if (results) {
        res.json(formatComments(results));
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