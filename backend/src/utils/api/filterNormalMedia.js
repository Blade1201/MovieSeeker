import {imageAbsolutePath} from "../../configs/outer.api.config.js";

const filterNormalMedia = (media, explicit_type) => {
    return {
        Id: media["id"] ?? null,
        Type: explicit_type ?? media["media_type"] ?? null,
        Title: media["title"] ?? media["name"] ?? null,
        Poster: media["poster_path"] ? imageAbsolutePath(media["poster_path"]) : null,
        Year: media["first_air_date"] ?? media["release_date"] ?? null,
        Ratings: media["vote_average"] ?
            Math.round((media["vote_average"] + Number.EPSILON) * 10) / 10 : null,
    }
}

export default filterNormalMedia;