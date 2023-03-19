import {API_KEY, BASE_URL, LANGUAGE, PAGE, refreshBaseImageUrl, REGION} from "../../configs/outer.api.config.js";
import fetchListApiUtil from "./fetchList.api.util.js";
import filterNormalMedia from "./filterNormalMedia.js";

const createUrl = () => {
    const url = new URL(`${BASE_URL}/movie/upcoming`);

    url.search = new URLSearchParams({
        api_key: API_KEY,
        language: LANGUAGE,
        page: PAGE,
        region: REGION
    });

    return url.href;
}

const getUpcomingApiUtil = async () => {
    await refreshBaseImageUrl();
    const url = createUrl();
    const list = await fetchListApiUtil(url);
    return list.map(media => filterNormalMedia(media, "movie"));
}

export default getUpcomingApiUtil;