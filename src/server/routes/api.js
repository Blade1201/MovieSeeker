const searchMedia = require("../outerAPI/searchMedia");
const searchDetails = require("../outerAPI/searchDetails");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
    const {s, m, i} = req.query;

    let json = {message: "Invalid params"};

    if (s !== undefined) {
       await searchMedia(s).then(mediaList => {
            json = mediaList;
        });
    } else if (m !== undefined && i !== undefined) {
        await searchDetails(m, i).then(details => {
            json = details;
        });
    }
    return res.json(json);
})

module.exports = router;