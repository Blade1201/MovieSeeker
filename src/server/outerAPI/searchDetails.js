const conf = require("./configuration");
const axios = require("axios");

const extraDetails = ["external_ids", "videos"];
const getExtraDetailsList = Type => {
    if (Type === "movie" || Type === "tv") {

        const extraDetailsClone = [...extraDetails];
        extraDetailsClone.push("watch/providers");
        return extraDetailsClone.join(",");

    } else if (Type === "person") {
        return extraDetails.join(",");
    }
    return "";
}

const fetchDetails = (Type, Id) => {
    const detailsURL = new URL(`https://api.themoviedb.org/3/${Type}/${Id}`);
    detailsURL.search = new URLSearchParams({
        api_key: conf.API_KEY,
        language: conf.LANGUAGE,
        append_to_response: getExtraDetailsList(Type),
    });

    return axios.get(detailsURL.href)
        .then(res => res.data)
        .then(data => data)
        .catch(err => {
            console.error(err.data);
            return [];
        });
};

const filterDetails= details => {
    const Title = details["title"] ?? details["name"];
    const ImdbID = details["external_ids"]["imdb_id"];
    const Year = details["first_air_date"] ?? details["release_date"] ?? details["birthday"];
    const Ratings = details["vote_average"] ?? null;
    const Genre = details["genres"]?.map(genre => genre.name).join(", ") ?? null;
    const Runtime = details["runtime"] ?? null;
    const Poster = conf.imageAbsolutePath(details["poster_path"] ?? details["profile_path"]);
    const Plot = details["overview"] ?? details["biography"];

    let Providers = null;

    if (details.hasOwnProperty("watch/providers")) {
        Providers = details["watch/providers"]?.results?.HU?.flatrate.map(p => {
            return {
                Name: p["provider_name"],
                Logo: conf.imageAbsolutePath(p["logo_path"]),
            }
        });
    }

    const Videos = details.videos?.results?.filter(result => {
        return result["iso_3166_1"] === "HU" && result["site"] === "YouTube" && result["official"]
    }).map(video => {
        return {
            Name: video["name"],
            URL: `https://www.youtube.com/watch?v=${video["key"]}`,
        }
    }) ?? null;

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
        Videos
    }
};

const searchDetails = async (Type, Id) => {
    await conf.refreshBaseImageUrl();

    const details = await fetchDetails(Type, Id);

    return filterDetails(details);
}

module.exports = searchDetails;
