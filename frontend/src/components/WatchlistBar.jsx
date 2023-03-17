import React, {useContext} from "react";
import {WatchListContext} from "../contexts/watchlistContext";

const WatchlistBar = ({selected, userId, subscribed, watched, setWatched}) => {
    const {handleCreate : create, handleEdit : edit} = useContext(WatchListContext);

    if (selected.ImdbId === 0 || userId === 0 || !subscribed) {
        return null;
    }

    const handleEdit = async (e) => {
        const newWatchedValue = e.target.value;
        await edit(selected.ImdbID, newWatchedValue);
        setWatched(newWatchedValue === 'Y' ? -1 : 1);
    };

    const handleCreate = async (e) => {
        const newWatchedValue = e.target.value;
        selected["Watched"] = newWatchedValue;
        await create(selected);
        setWatched(newWatchedValue === 'Y' ? -1 : 1);
    };

    switch (watched) {
        case -1:
            return (
                <>
                    <button onClick={handleEdit} value='N' className="watchButton">Megnézendőhöz ad</button>
                </>
            )
        case 0:
            return (
                <>
                            <button onClick={handleCreate} value='Y' className="watchedButton">Megnézettekhez ad</button>
                            <button onClick={handleCreate} value='N' className="watchButton">Megnézendőhöz ad</button>
                </>
            )
        case 1:
            return (
                <>
                    <button onClick={handleEdit} value='Y' className="watchedButton">Megnézettekhez ad</button>
                </>
            )
        default:
            return null;
    }
}

export default WatchlistBar;