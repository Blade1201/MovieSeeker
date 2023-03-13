import React from "react";
import WatchlistResult from "./WatchlistResult";

const WatchlistResults = ({ results, openPopup, type }) => {
    return (
        <section className = "results">
            {results.map(result => (
                <WatchlistResult key = { result.ImdbID } result = { result } openPopup = { openPopup } type = {type} />
            ))}
        </section>
    );
}

export default WatchlistResults;