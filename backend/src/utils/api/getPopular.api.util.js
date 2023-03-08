import {API_KEY, BASE_URL, LANGUAGE, refreshBaseImageUrl} from "../../configs/outer.api.config.js";
import filterNormalMedia from "./filterNormalMedia.js";
import axios from "axios";

const createUrls = (type) => {
    const url = new URL(`${BASE_URL}/${type}/popular`);

    url.search = new URLSearchParams({
        api_key: API_KEY,
        language: LANGUAGE,
    });

    const urls = [];

    for (let i = 1; i <= 3; i++) {
        urls.push(`${url.href}&page=${i}`);
    }

    return urls;
}

const fetchParallel = (endpoints) => {
    return Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
        axios.spread((...allData) => {
            return allData.map(d => d.data.results).flat();
        })
    );
}

const filterMediaList = (list, type) => list.map(media => filterNormalMedia(media, type));


const getPopularApiUtil = async (type) => {
    await refreshBaseImageUrl();
    const urls = createUrls(type);
    const list = await fetchParallel(urls);
    return filterMediaList(list, type);
};

export default getPopularApiUtil;