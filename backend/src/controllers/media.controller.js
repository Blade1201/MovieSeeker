import MediaDao from "../dao/media.dao.js";
import checkExistOfImdbIdCommentUtil from "../utils/comment/checkExistOfImdbId.comment.util.js";

const extractMediaDetailsFromDetails = (details) => {
    const {id : tmdbId, poster_path : posterPath} = details;
    const tmdbType = details["media_type"][0].toUpperCase();
    let title, originalTitle;

    if (tmdbType === "M") {
        title = details["title"];
        originalTitle = details["original_title"];
    } else {
        title = details["name"];
        originalTitle = details["original_name"];
    }

    return {
        tmdbType,
        tmdbId,
        title,
        originalTitle,
        posterPath
    }
}

const checkExistByImdbId = async (imdbId) => {
    return new MediaDao().findByImdb(imdbId);
}

const create = (values) => {
    return new MediaDao().create(values);
}

const createMediaIfNotExistAndGet = async (req) => {
    const {imdbId} = req.body;

    let media = await checkExistByImdbId(imdbId);

    if (media) {
        req.body.media = media;
        return Promise.resolve();
    }

    const exist = await checkExistOfImdbIdCommentUtil(imdbId);

    if (!exist) {
        return Promise.reject("Nem létező azonosító.");
    }

    media = await create({imdbId, ...extractMediaDetailsFromDetails(exist)});

    if (!media) {
        return Promise.reject("Hiba történt az adatbáziskapcsolat során.");
    }

    req.body.media = media;
    return Promise.resolve();
}

export {
    checkExistByImdbId,
    create,
    createMediaIfNotExistAndGet
}