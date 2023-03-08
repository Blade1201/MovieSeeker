import {
    PAGE, INCLUDE_ADULT, REGION, API_KEY, LANGUAGE, refreshBaseImageUrl, BASE_URL
} from "../../configs/outer.api.config.js";
import fetchListApiUtil from "./fetchList.api.util.js";
import filterNormalMedia from "./filterNormalMedia.js";


const url = new URL(`${BASE_URL}/search/multi`);

url.search = new URLSearchParams({
    api_key: API_KEY,
    language: LANGUAGE,
    query: "",
    page: PAGE,
    include_adult: INCLUDE_ADULT,
    region: REGION
});

const removePeopleFromTheList = list => {
    return list.filter(result => result["media_type"] !== "person");
};

const filterSearchList = list => {
    return removePeopleFromTheList(list).map(media => {
        return filterNormalMedia(media);
    })
}

const searchMediaApiUtil = async (query) => {
    await refreshBaseImageUrl();

    url.searchParams.set("query", query);

    const list = await fetchListApiUtil(url.href);

    if (list.length === 0) return [];

    return filterSearchList(list);
};

export default searchMediaApiUtil;