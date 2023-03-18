import React from "react";
import '../styles/rating.css';
import axios from "axios";


const Rating = ({ active, selectedRate, setSelectedRate, setOverallRate, imdbId }) => {

    const possibleRates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const handleClick = (rate) => {

        const url = "/rating";
        const data = {imdbId, ratingScore: rate};
        const config = {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        };

        if (selectedRate === null) {
            axios.post(url, data, config)
                .then(res => res.data)
                .then(overallRate => {
                    setSelectedRate(rate);
                    setOverallRate(overallRate);
                })
                .catch(console.error)
        } else {
            axios.patch(url, data, config)
                .then(res => res.data)
                .then(overallRate => {
                    setSelectedRate(rate);
                    setOverallRate(overallRate);
                })
                .catch(console.error)
        }
    };


    const resetRating = () => {
        if (selectedRate === null) {
            return;
        }

        axios.delete("/rating", {
            data: {
                imdbId
            },
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.data)
            .then(overallRate => {
                setSelectedRate(null);
                setOverallRate( overallRate === "0.0" || 0);
            })
            .catch(console.error);
    }

    return (
        <>
            <div className = { active ? "card active" : "card"} onClick = { e =>  e.stopPropagation()} >
                <div className = "card-header">
                    <p className = "title"> Helyezze nyílvánosság elé értékelését </p>
                </div>

                <div className = "card-body">
                        <div className="stars">
                            {possibleRates.map(rate => <i
                                key={rate}
                                className={"fas fa-star " + ((rate <= selectedRate) ? 'in-rate ' : '')}
                                onClick={() => handleClick(rate)}> </i>)
                            }
                        </div>
                    <button onClick = { resetRating }> Törlés </button>
                </div>
            </div>
        </>
    );
}

export default Rating;