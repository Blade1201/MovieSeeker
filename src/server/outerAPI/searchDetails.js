const conf = require("./configuration");
const axios = require("axios");

const EXTRA_DETAILS = ["external_ids", "watch/providers", "credits", "videos&include_video_language=hu,en"];

const fetchDetails = (Type, Id) => {
    const detailsURL = new URL(`https://api.themoviedb.org/3/${Type}/${Id}`);
    detailsURL.search = new URLSearchParams({
        api_key: conf.API_KEY,
        language: conf.LANGUAGE,
    });

    const extras = `append_to_response=${EXTRA_DETAILS.join(',')}`;

    return axios.get(`${detailsURL.href}&${extras}`)
        .then(res => res.data)
        .then(data => data)
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
            Url: `${YOUTUBE_BASE_URL}?v=${v["key"]}`,
        }
    });
}

const getWatchProviders = watchProvidersObj => {
    const flatrates = watchProvidersObj?.results?.HU?.flatrate;
    if (!flatrates) return null;

    return flatrates.map(f => {
        return {
            Name: f["provider_name"],
            Logo: conf.imageAbsolutePath(f["logo_path"]),
        }
    });
}

const getCast = credits => {
    const cast = credits["cast"];

    if (!cast) return null;

    return cast.map(c => {
        return {
            Name: c["original_name"],
            Image: conf.imageAbsolutePath(c["profile_path"]),
        }
    });
};

const reduceArraySize = (cast, newSize) => {
    if (!Array.isArray(cast)) return null;
    return cast.slice(0, newSize);
};

const filterDetails = details => {
    const Title = details["title"] ?? details["name"] ?? null;
    const ImdbID = details["external_ids"]["imdb_id"] ?? null;
    const Year = details["first_air_date"] ?? details["release_date"] ?? null;
    const Ratings = details.vote_average ? Number(details.vote_average).toFixed(1) : null;
    const Genre = details["genres"]?.map(genre => genre.name).join(", ") ?? null;
    const Runtime = details["runtime"] ?? details?.episode_run_time[0] ?? null;
    const Poster = details["poster_path"] ? conf.imageAbsolutePath(details["poster_path"]) : null;
    const Plot = details["overview"] ?? null;
    const Providers = getWatchProviders(details["watch/providers"]);
    const Videos = getVideos(details["videos"]);
    const Cast = reduceArraySize(getCast(details["credits"]), 25);

    return {
        Title,
        ImdbID,
        Year,
        Ratings,
        Genre,
        Runtime,
        Poster,
        Plot,
        Providers,
        Videos,
        Cast
    }
};

const searchDetails = async (Type, Id) => {
    if (!(Type === "tv" || Type === "movie") && isFinite(Id)) {
        return {message: "Invalid params"};
    }

    const details = await fetchDetails(Type, Id);

    if (details.hasOwnProperty("success") && !details["success"]) {
        return {message: "Invalid params"};
    }

    await conf.refreshBaseImageUrl();

    return filterDetails(details);
}

module.exports = searchDetails;
