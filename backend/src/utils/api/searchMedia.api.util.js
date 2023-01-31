import axios from "axios";
import {PAGE, INCLUDE_ADULT, REGION, imageAbsolutePath,
    API_KEY, LANGUAGE, refreshBaseImageUrl} from "../../configs/outer.api.config.js";


const url = new URL("https://api.themoviedb.org/3/search/multi");

url.search = new URLSearchParams({
    api_key: API_KEY,
    language: LANGUAGE,
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

const removePeopleFromTheList = list => {
    return list.filter(result => result["media_type"] !== "person");
};

const filterSearchList = list => {
    return removePeopleFromTheList(list).map(media => {
        return {
            Id: media["id"] ?? null,
            Type: media["media_type"] ?? null,
            Title: media["title"] ?? media["name"] ?? null,
            Poster: media["poster_path"] ? imageAbsolutePath(media["poster_path"]) : null,
            Year: media["first_air_date"] ?? media["release_date"] ?? null,
            Ratings: media["vote_average"] ?
                Math.round((media["vote_average"] + Number.EPSILON) * 10) / 10 : null,
        }
    })
}

const searchMediaApiUtil = async (query) => {
    await refreshBaseImageUrl();

    url.searchParams.set("query", query);

    const list = await fetchList();

    if (list.length === 0) return [];

    return filterSearchList(list);
};

export default searchMediaApiUtil;