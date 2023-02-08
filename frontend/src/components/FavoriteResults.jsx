import React from 'react';
import FavoriteResult from "./FavoriteResult";

const FavoriteResults = ({ results, openPopup }) => {
    return (
        <section className = "results">
            {results.map(result => (
                <FavoriteResult key = { result.ImdbID } result = { result } openPopup = { openPopup } />
            ))}
        </section>
    );
};

export default FavoriteResults;