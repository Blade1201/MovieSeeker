import axios from "axios";
import {API_KEY, LANGUAGE} from "../../configs/outer.api.config.js";

const checkExistOfImdbIdCommentUtil = (imdbId) => {
    const detailsURL =
        new URL(`https://api.themoviedb.org/3/find/${imdbId}`);
    detailsURL.search = new URLSearchParams({
        api_key: API_KEY,
        language: LANGUAGE,
        external_source: "imdb_id"
    });

    return axios.get(detailsURL)
        .then(res => {
            let movie_result = res?.data?.movie_results?.[0];

            if (movie_result) return movie_result;

            return res?.data?.tv_results?.[0];
        })
        .catch(() => false);
};

export default checkExistOfImdbIdCommentUtil;