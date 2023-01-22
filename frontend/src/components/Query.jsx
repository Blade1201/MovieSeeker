import React from 'react';
import ReplacementImage from '../images/image-not-found.jpg';
import Star from "../images/star.png";


const Result = ({ result, openPopup }) => {

    return (
        <div className = "result" onClick={() => openPopup({ id: result.Id, type: result.Type })}>

            {result.Poster !== null ?
                <img alt = { result.Title } src = { result.Poster }
                     onError = { e => e.target.src = ReplacementImage }/>

                : <img alt = { result.Title } src = { ReplacementImage }/>
            }

                <h3> { result.Title } <span> Értékelés: {result.Ratings}
                    <img alt = "not-found!" src = { Star } /></span>
                    <span> Megjelenés: {result.Year} </span></h3>

            </div>
    );
};

export default Result;