import RatingDao from "../dao/rating.dao.js";
import MediaDao from "../dao/media.dao.js";

const exists = async (user, media) => {
    const mediaId = media.id;
    const userId = user.id;

    const result = await new RatingDao().findByPk(userId, mediaId);


    return !!result;
};

const create = async (req, res, next) => {
    const {media, user, ratingScore} = req.body;

    const result = await new RatingDao().create(user["id"], media["id"], ratingScore);
    if (result) {
        next();
    } else {
        res.status(500).json({success: false, blameUser: false, reason: "Hiba történt az adatbázis kapcsolat közben."});
    }
}

const edit = async (req, res, next) => {
    const {ratingScore, rating} = req.body;

    const result = await new RatingDao().update(rating, ratingScore);

    if (result) {
        next();
    } else {
        res.status(500).json({success: false, blameUser: false, reason: "Hiba történt az adatbázis kapcsolat közben."});
    }
}

const destroy = async (req, res, next) => {
    const {rating} = req.body;

    const result = await new RatingDao().delete(rating);

    if (result) {
        next();
    } else {
        res.status(500).json({success: false, blameUser: false, reason: "Hiba történt az adatbázis kapcsolat közben."});
    }
}

const roundAverageScore = (rating) => {
    const score = rating[0]["dataValues"]["avgScore"];
    return (Math.round(score * 100) / 100).toFixed(2);
}

const getAverageScoreByMedia = async (req, res) => {
    const {media} = req.body;

    const rating = await new RatingDao().getAverageScore(media);

    if (rating) {
        res.json(roundAverageScore(rating));
    } else {
        res.status(500).json({success: false, blameUser: false, reason: "Hiba történt az adatbázis kapcsolat közben."});
    }
}

const getAverageScoreByImdbId = async (imdbId) => {
    const media = await new MediaDao().findByImdb(imdbId);

    if (!media) {
        return 0.0;
    }

    const rating = await new RatingDao().getAverageScore(media);

    if (rating) {
        return roundAverageScore(rating);
    }

    return 0.0;
}

const get = async (req, res) => {
    const {user} = req.body;
    const {imdbId} = req.params;

    const media = await new MediaDao().findByImdb(imdbId);

    if (!media) {
        res.json({success: true, ratingScore: null});
        return;
    }

    let result;

    try {
        result = await new RatingDao().get(user, media);
    } catch (e) {
        res.status(500).json({success: false, blameUser: false, reason: "Hiba történt az adatbázis kapcsolat közben."});
        return;
    }

    if (result) {
        res.json({success: true, ratingScore: result["rating"]});
    } else {
        res.status(500).json({success: true, ratingScore: null});
    }
}

export {
    create,
    get,
    edit,
    destroy,
    exists,
    getAverageScoreByImdbId,
    getAverageScoreByMedia
}