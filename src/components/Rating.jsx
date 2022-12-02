import React, {useState} from "react";
import '../styles/rating.css';



const Rating = ({ active }) => {


    const [selectedRate, setSelectedRate] = useState(null);

    const possibleRates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


    const resetRating = () => {
        if(selectedRate !== null) {
            setSelectedRate(null)
        }
    }




    return (
        <>
            <div className = { active ? "card active" : "card"} onClick = { e =>  e.stopPropagation()} >
                <div className = "card-header">
                    <p className = "title"> Helyezze nyílvánosság elé értékelését </p>
                </div>

                <div className = "card-body">
                    <div className = "stars">
                        {possibleRates.map(rate => <i
                            key = { rate }
                            className = {"fas fa-star " + ((rate <= selectedRate) ? 'in-rate ' : '')}
                            onClick = { () => setSelectedRate(rate) } > </i>)
                        }
                    </div>

                    <button onClick = { resetRating }> Törlés </button>

                </div>
            </div>
        </>
    );
}

export default Rating;