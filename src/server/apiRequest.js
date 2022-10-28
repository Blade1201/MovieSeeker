const api_key = "b683e69f0db9d819f79fbc3e6a99595c"

import {get} from "axios";

const url = new URL("https://api.themoviedb.org/3/search/multi");

url.search = new URLSearchParams({
    api_key,
    language: "hu",
    query: "",
    page: 1,
    include_adult: false,
    region: "hu"
});

const fetchContent = () => {
    return get(url.href)
        .then(res => res.data)
        .catch(console.error);
}

const makeRequest = async (query) => {
    url.searchParams.set("query", query);
    return await fetchContent();
};

export default makeRequest;