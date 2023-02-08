import FavoriteDao from "../dao/favorite.dao.js";
import {imageAbsolutePath, refreshBaseImageUrl} from "../configs/outer.api.config.js";

const formatList = async (favorites) => {
    const result = [];
    await refreshBaseImageUrl();

    for (const favorite of favorites) {
        const {tmdbId: id, title, imdbId} = favorite;
        const type = favorite["tmdbType"] === "M" ? "movie" : "tv";
        const poster = favorite["posterPath"] ? imageAbsolutePath(favorite["posterPath"]) : null;

        result.push({
            Id: id,
            ImdbID: imdbId,
            Type: type,
            Title: title,
            Poster: poster,
        });
    }

    return result;
}

const exist = async (user, media) => {

    const result = await new FavoriteDao().findByPk(user, media)

    return !!result;
}

const getList = async (req, res) => {
    const {user} = req.body;
    const results = await new FavoriteDao().findByUser(user);

    if (results) {
        res.json(await formatList(results));
    } else {
        res.status(500).json({success: false, blameUser: false, reason: "Hiba történt az adatbázis kapcsolat közben."});
    }
}

const create = async (req, res) => {
    const {user, media} = req.body;

    const result = await new FavoriteDao().create(user, media);

    if (result) {
        res.status(201).json({success: true});
    } else {
        res.status(500).json({success: false, blameUser: false, reason: "Hiba történt az adatbázis kapcsolat közben."});
    }
}

const destroy = async (req, res) => {
    const {favorite} = req.body;

    const result = await new FavoriteDao().delete(favorite);

    if (result) {
        res.status(200).json({success: true});
    } else {
        res.status(500).json({success: false, blameUser: false, reason: "Hiba történt az adatbázis kapcsolat közben."});
    }
}

export {
    exist,
    create,
    destroy,
    getList
}