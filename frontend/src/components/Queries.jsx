import React from 'react';
import Query from "./Query";

function Queries({ results, openPopup }) {
    return (
        <div className="query-results">

            {
                results.slice(0,3).map(result => (

                        <Query key = { result.ImdbID } result = { result } openPopup = { openPopup } />
                    ))}
        </div>
    );
}

export default Queries;