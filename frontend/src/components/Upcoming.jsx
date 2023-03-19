import {Link} from "react-router-dom";
import Back from "../images/back-arrow.png";
import Popup from "./Popup";
import React, {useEffect, useState} from "react";
import Results from "./Results";
import axios from "axios";

const Upcoming = () => {
    const [state, setState] = useState({
        search: "",
        results: [],
        selected: {}
    });

    useEffect(() => {
        axios.get(`/api/upcoming`)
            .then(res => {
                if (res.status === 200) {
                    const {data} = res;
                    setState(prevState => {
                        return {...prevState, results: data}
                    });
                }
            })
    }, []);

    const API_URL = "/api?";

    const openPopup = (props) => {
        axios(API_URL + "&i=" + props.id + "&m=" + props.type)
            .then(({data}) => {

                let result = data;


                setState(prevState => {
                    return {...prevState, selected: result}
                });
            });
    };

    const closePopup = () => {
        setState(prevState => {
            return {...prevState, selected: {}}
        });
    };

    return (
        <>
            <Link to="/search"> <img className='backToSearch' alt='back-to-hub' src={Back}/> </Link>
            <h1 className="myFavorites">Hamarosan megjelenő filmek:</h1>
            <main>
                <Results results={state.results} openPopup={openPopup}/>
                {(typeof state.selected.Title != "undefined") ?
                    <Popup selected={state.selected} closePopup={closePopup}/>
                    :
                    false}
            </main>
        </>
    )
}

export default Upcoming;