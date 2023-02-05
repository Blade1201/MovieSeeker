import axios from "axios";
import {API_KEY, LANGUAGE, imageAbsolutePath, refreshBaseImageUrl} from "../../configs/outer.api.config.js";
import {getAverageScoreByImdbId} from "../../controllers/rating.controller.js";

const BASIC_DETAILS = ["external_ids", "watch/providers", "credits", "videos&include_video_language=hu,en"];

const getExtras = (type) => {
    if (type === "movie") {
        return ["release_dates", BASIC_DETAILS];
    } else if (type === "tv") {
        return ["content_ratings", BASIC_DETAILS];
    }
    return "";
};

const fetchDetails = (type, id) => {
    const detailsURL = new URL(`https://api.themoviedb.org/3/${type}/${id}`);
    detailsURL.search = new URLSearchParams({
        api_key: API_KEY,
        language: LANGUAGE,
    });

    const extras = `append_to_response=${getExtras(type).join(',')}`;

    return axios.get(`${detailsURL.href}&${extras}`)
        .then(res => res.data)
        .then(data => {
            data.media_type = type;
            return data;
        })
        .catch(err => {
            console.error(err.data);
            return [];
        });
};

const getVideos = videosObj => {
    if (videosObj === null) return null;

    let rawVideosList = videosObj["results"].filter(v => v["site"] === "YouTube" && v["type"] === "Trailer");

    if (rawVideosList.length === 0) return null;

    const huVideos = rawVideosList.filter(v => v["iso_639_1"] === "hu");

    if (huVideos.length > 0) {
        rawVideosList = huVideos;
    }

    return rawVideosList.map(v => {
        return {
            Name: v["name"],
            Url: v["key"],
        }
    });
}

const getWatchProviders = watchProvidersObj => {
    const flatrates = watchProvidersObj?.results?.HU?.flatrate;
    if (!flatrates) return null;

    return flatrates.map(f => {
        return {
            Name: f["provider_name"],
            Logo: imageAbsolutePath(f["logo_path"]),
        }
    });
}

const getCast = credits => {
    const cast = credits["cast"];

    if (!cast || cast.length === 0) return null;

    return cast.map(c => {
        return {
            Name: c["original_name"],
            Image: imageAbsolutePath(c["profile_path"]),
        }
    });
};

const reduceArraySize = (cast, newSize) => {
    if (!Array.isArray(cast)) return null;
    return cast.slice(0, newSize);
};

const getMovieCertification = release_dates => {
    const results = release_dates?.results;

    if (!results || results.length === 0) return null;

    const huCertificationsDetails = results.find(result => result["iso_3166_1"] === "HU");

    if (!huCertificationsDetails) {
        const deCertificationsDetails = results.find(result => result["iso_3166_1"] === "DE");
        if (!deCertificationsDetails) return null;

        return deCertificationsDetails["release_dates"][0]["certification"];
    }

    return huCertificationsDetails["release_dates"][0]["certification"];
}

const getTVCertification = content_ratings => {
    const results = content_ratings?.results;

    if (!results || results.length === 0) return null;

    const huCertificationDetails = results.find(result => result["iso_3166_1"] === "HU");

    if (!huCertificationDetails) {
        const deCertificationDetails = results.find(result => result["iso_3166_1"] === "DE");
        if (!deCertificationDetails) return null;
        
        return deCertificationDetails["rating"];
    }

    return huCertificationDetails["rating"];
}

const filterDetails = async details => {
    return {
        Title: details["title"] ?? details["name"] ?? null,
        ImdbID: details["external_ids"]["imdb_id"] ?? null,
        Year: details["first_air_date"] ?? details["release_date"] ?? null,
        Ratings: await getAverageScoreByImdbId(details["external_ids"]["imdb_id"] ?? null),
        Genre: details["genres"]?.map(genre => genre.name).join(", ") || null,
        Runtime: details["runtime"] || details?.episode_run_time?.[0] || null,
        Poster: details["poster_path"] ? imageAbsolutePath(details["poster_path"]) : null,
        Plot: details["overview"] || null,
        Providers: getWatchProviders(details["watch/providers"]),
        Videos: getVideos(details["videos"]),
        Cast: reduceArraySize(getCast(details["credits"]), 25),
        Certification: details["media_type"] === "movie" ?
            getMovieCertification(details["release_dates"]) : getTVCertification(details["content_ratings"]),
    }
};

const searchDetailsApiUtil = async (type, id) => {
    if (!(type === "tv" || type === "movie") && isFinite(id)) {
        return {message: "Invalid params"};
    }

    const details = await fetchDetails(type, id);

    if (details.hasOwnProperty("success") && !details["success"]) {
        return {message: "Invalid params"};
    }

    await refreshBaseImageUrl();

    return filterDetails(details);
}

export default searchDetailsApiUtil;
