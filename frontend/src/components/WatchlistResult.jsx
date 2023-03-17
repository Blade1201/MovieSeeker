import React, {useContext} from "react";
import ReplacementImage from "../images/image-not-found.jpg";
import {WatchListContext} from "../contexts/watchlistContext";

const WatchlistResult = ({ result, openPopup, type}) => {

    const {handleEdit} = useContext(WatchListContext);

    const handleButtonClick = async e => {
        e.stopPropagation();
        handleEdit(result.ImdbID, type === "view" ? "Y" : "N");
    }

    return (
        <div className = "result" onClick={() => openPopup({ id: result.Id, type: result.Type })}>
            {result.Poster !== null ?
                <img alt = { result.Title } src = { result.Poster }
                     onError = { e => e.target.src = ReplacementImage }/>

                : <img alt = { result.Title } src = { ReplacementImage }/>
            }

            <h3> { result.Title } </h3>

            <div className = "delete-button" onClick={handleButtonClick}>
                {type === "view"? "Törlés" : "Törlés"}
            </div>
        </div>
    );
};

export default WatchlistResult;