const conf =  require("./configuration.js");
const axios = require("axios");

const INCLUDE_ADULT = false;
const PAGE = 1;
const REGION = "hu"

const url = new URL("https://api.themoviedb.org/3/search/multi");

url.search = new URLSearchParams({
    api_key: conf.API_KEY,
    language: conf.LANGUAGE,
    query: "",
    page: PAGE,
    include_adult: INCLUDE_ADULT,
    region: REGION
});

const fetchList = () => {
    return axios.get(url.href)
        .then(res => res.data)
        .then(json => json["results"] ?? [])
        .catch(console.error);
}

const filterSearchList = list => {
    return list.map(media => {
        return {
            Id: media["id"],
            Type: media["media_type"],
            Title: media["title"] ?? media["name"],
            Poster: conf.imageAbsolutePath(media["poster_path"] ?? media["profile_path"])
        }
    })
}

const searchMedia = async (query) => {
    await conf.refreshBaseImageUrl();

    url.searchParams.set("query", query);

    const list = await fetchList();

    if (list.length === 0) return [];

    return filterSearchList(list);
};

module.exports = searchMedia;