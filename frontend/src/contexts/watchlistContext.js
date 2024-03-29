import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import userContext from "./userContext";

export const WatchListContext = createContext();

export const Watchlist = ({children}) => {
    const [watchlist, setWatchlist] = useState([]);

    const {id} = useContext(userContext);

    const [flag, setFlag] = useState(false);

    const fetchData = async () => {
        try {
            const res = await axios.get("/watchlist");
            res.status === 200 && setWatchlist(res["data"]);
            return true;
        } catch (e) {
            return false;
        }
    };

    useEffect( () => {
        if (id) {
            fetchData();
        }
    }, [id, flag]);

    const handleCreate = async (watchlistItem) => {
        try {
            await axios.post("/watchlist", {
                imdbId : watchlistItem["ImdbID"],
                watched: watchlistItem["Watched"]
            });
            setFlag(!flag);
        } catch (e) {
            console.error(e.response);
        }
    }

    const handleEdit = async (imdbId, newWatchedValue) => {
        try {
            await axios.patch("/watchlist", {
                imdbId,
                watched: newWatchedValue
            });
            const result = watchlist.find(w => w["ImdbID"] === imdbId);
            result["Watched"] = newWatchedValue;
            const filtered = watchlist.filter(w => w["ImdbID"] !== imdbId);
            setWatchlist([...filtered, result]);
        } catch (e) {
            console.error(e.response);
        }
    }

    const clearWatchlist = () => {
        setWatchlist([]);
    }

    const inWatchlist = (media) => {
        const result = watchlist.find(watchlistItem => watchlistItem["ImdbID"] === media["ImdbID"]);

        if (!result) {
            return 0;
        }

        return result["Watched"] === "Y" ? -1 : 1
    }

    const getWatchlistByType = (type) => {
        if (type === "view") {
            return watchlist.filter(watchlistItem => watchlistItem["Watched"] === "N");
        } else if (type === "viewed") {
            return watchlist.filter(watchlistItem => watchlistItem["Watched"] === "Y");
        }
    }

    return <WatchListContext.Provider value={{watchlist, handleCreate, handleEdit, clearWatchlist, inWatchlist, getWatchlistByType}}>{children}</WatchListContext.Provider>;
}