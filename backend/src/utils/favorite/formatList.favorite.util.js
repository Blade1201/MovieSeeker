import {imageAbsolutePath, refreshBaseImageUrl} from "../../configs/outer.api.config.js";

const formatListFavoriteUtil = async (favorites) => {
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

export default formatListFavoriteUtil;