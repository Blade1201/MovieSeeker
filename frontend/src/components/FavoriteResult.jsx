import React, {useContext} from 'react';
import ReplacementImage from '../images/image-not-found.jpg';
import {FavoriteContext} from "../contexts/favoriteContext";


const FavoriteResult = ({ result, openPopup}) => {
    const {handleDelete} = useContext(FavoriteContext);

    const handleDeleteButtonClick = e => {
        e.stopPropagation();
        handleDelete(result);
    }

    return (
            <div className = "result" onClick={() => openPopup({ id: result.Id, type: result.Type })}>
                {result.Poster !== null ?
                    <img alt = { result.Title } src = { result.Poster }
                         onError = { e => e.target.src = ReplacementImage }/>

                    : <img alt = { result.Title } src = { ReplacementImage }/>
                }

                <h3> { result.Title } </h3>

                <div className = "delete-button" onClick={handleDeleteButtonClick}>
                    Törlés
                </div>
            </div>
    );
};

export default FavoriteResult;