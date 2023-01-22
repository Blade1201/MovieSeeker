const axios = require("axios");
const {API_KEY, LANGUAGE} = require("../../configs/outer.api.config");

const checkExistOfImdbId = (imdbId) => {
    const detailsURL =
        new URL(`https://api.themoviedb.org/3/find/${imdbId}`);
    detailsURL.search = new URLSearchParams({
        api_key: API_KEY,
        language: LANGUAGE,
        external_source: "imdb_id"
    });

    return axios.get(detailsURL)
        .then(res => {
            return res?.data?.movie_results?.length > 0;
        })
        .catch(false)
};

module.exports = checkExistOfImdbId;