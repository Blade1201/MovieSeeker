const axios = require("axios");
const API_KEY = "b683e69f0db9d819f79fbc3e6a99595c";
const posterSize = "original";
const url = new URL("https://api.themoviedb.org/3/search/multi");
let baseImageUrl = "";

const getBaseImageUrl = () => {
    return axios.get(`https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`)
        .then(res => {
            baseImageUrl = res.data.images.secure_base_url;
        })
        .catch(console.error);
}

url.search = new URLSearchParams({
    api_key: API_KEY,
    language: "hu",
    query: "",
    page: 1,
    include_adult: false,
    region: "hu"
});

const fetchContent = () => {
    return axios.get(url.href)
        .then(res => res.data)
        .then(json => json.results ?? [])
        .catch(console.error);
}

const imageAbsolutePath = path => `${baseImageUrl}${posterSize}${path}`;

const resultsFilter = results => {
    const filteredResults = [];

    for (const result of results) {
        const newResult = {
            Id: result["id"],
            Type: result["media_type"],
        };

        if (newResult.Type === "person") {
            newResult["Poster"] = imageAbsolutePath(result["profile_path"]);
        } else if (newResult.Type === "movie" || newResult.Type === "tv") {
            newResult["Poster"] = imageAbsolutePath(result["poster_path"]);
        }

        filteredResults.push(newResult);
    }
    return filteredResults;
}

const makeRequest = async (query) => {
    if (baseImageUrl.length === 0) {
       await getBaseImageUrl();
    }

    url.searchParams.set("query", query);
    let results = await fetchContent();

    if (results.length > 0) {
        results = resultsFilter(results);
    }

    console.log(results);
};

//Test No. 1
makeRequest("Zendaya");

//Test No. 2
makeRequest("Zöld íjász");