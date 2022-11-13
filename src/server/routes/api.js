const searchMedia = require("../outerAPI/searchMedia");
const searchDetails = require("../outerAPI/searchDetails");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
    let {s, m, i} = req.query;

    let json = "";

    if (s !== undefined) {
        s = s.trim();
        if (s) {
            await searchMedia(s).then(mediaList => {
                if (mediaList.length > 0)
                    json = mediaList;
            });
        }
    } else if (m !== undefined && i !== undefined) {
       m = m.trim();
       i = i.trim();

       if (m && i) {
           await searchDetails(m, i).then(details => {
               json = details;
           });
       }
    }

    return res.json(json);
})

module.exports = router;