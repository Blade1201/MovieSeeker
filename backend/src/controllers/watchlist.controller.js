import WatchlistDao from "../dao/watchlist.dao.js";
import formatListFavoriteUtil from "../utils/favorite/formatList.favorite.util.js";

const exist = async (user, media) => {

    return await new WatchlistDao().findByPk(user, media);
}


const create = async (req, res) => {
    const {user, media} = req.body;

    if (await exist(user, media)) {
        res.status(400).json({success: false, message: "Már létezik ilyen érték a watchlistben!"});
        return;
    }

    const watched = req.body.watched;

    const result = new WatchlistDao().create(user, media, watched);

    if (result) {
        res.status(201).json({success: true});
    } else {
        res.status(500).json({success: false, reason: "Hiba történt az adatbázis kapcsolat közben."});
    }
}

const edit = async (req, res) => {
    const {user, media} = req.body;

    const watchListEntity = await exist(user, media);

    if (!watchListEntity) {
        res.status(400).json({success: false, message: "Még nem létezik ilyen érték a watchlistben!"});
        return;
    }

    const result = await new WatchlistDao().update(watchListEntity, req.body.watched);

    if (result) {
        res.json({success: true});
    } else {
        res.status(500).json({success: false, reason: "Hiba történt az adatbázis kapcsolat közben."});
    }
};

const get = async (req, res) => {
    const {userId} = req.body;

    const user = await new WatchlistDao().findByUserId(userId);

    const userWatchlist = user["watchlistMedia"];

    const result = await formatListFavoriteUtil(userWatchlist);

    result.forEach((media, index) => {
        media["Watched"] = userWatchlist[index]["Watchlist"]["watched"];
    });

    res.json(result);
}



export {create, get, edit}