import axios from "axios";

const LANGUAGE = "hu";
const POSTER_SIZE = "original";
const API_KEY = "b683e69f0db9d819f79fbc3e6a99595c";
const INCLUDE_ADULT = false;
const PAGE = 1;
const REGION = "hu"
let baseImageUrl = "";

const imageAbsolutePath = path => `${baseImageUrl}${POSTER_SIZE}${path}`;

const refreshBaseImageUrl = () => {
    return axios.get(`https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`)
        .then(res => {
            baseImageUrl = res["data"]["images"]["secure_base_url"];
        })
        .catch(console.error);
}

export {
    LANGUAGE,
    POSTER_SIZE,
    API_KEY,
    INCLUDE_ADULT,
    PAGE,
    REGION,
    imageAbsolutePath,
    refreshBaseImageUrl,
};