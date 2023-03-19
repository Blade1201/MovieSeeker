import searchMedia from "../utils/api/searchMedia.api.util.js";
import searchDetails from "../utils/api/searchDetails.api.util.js";
import getPopularApiUtil from "../utils/api/getPopular.api.util.js";
import getUpcomingApiUtil from "../utils/api/getUpcoming.api.util.js";

const search =  async (req, res) => {
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

const popular = async (req, res) => {
    const {type} = req.params;

    const result = await getPopularApiUtil(type);

    res.json(result.slice(0, 50));
}

const upcoming = async (req, res) => {
    return res.json(await getUpcomingApiUtil());
}

export {
    search,
    popular,
    upcoming
}