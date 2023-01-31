import searchMedia from "../utils/api/searchMedia.api.util.js";
import searchDetails from "../utils/api/searchDetails.api.util.js";

const apiSearchController =  async (req, res) => {
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

    res.json(json);
}

export default apiSearchController;