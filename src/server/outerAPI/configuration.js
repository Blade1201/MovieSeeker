const axios = require("axios");


exports.LANGUAGE = "hu";
exports.POSTER_SIZE = "original";
exports.API_KEY = "b683e69f0db9d819f79fbc3e6a99595c";

exports.imageAbsolutePath = path => `${exports.getBaseImageURL}${exports.POSTER_SIZE}${path}`;

exports.refreshBaseImageUrl = () => {
    return axios.get(`https://api.themoviedb.org/3/configuration?api_key=${exports.API_KEY}`)
        .then(res => {
            exports.getBaseImageURL = res["data"]["images"]["secure_base_url"];
        })
        .catch(console.error);
}