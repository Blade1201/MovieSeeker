import React, {Fragment, useEffect, useState} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import Back from "../images/back-arrow.png";
import Popup from "./Popup";
import Results from "./Results";
import axios from "axios";

const Popular = () => {
    const {type} = useParams();

    const [popular, setPopular] = useState([]);

    useEffect(() => {
        axios.get(`/api/popular/${type}`)
            .then(res => {
                if (res.status === 200) {
                    const {data} = res;
                    setPopular(data);
                }
            })
    }, [type]);

    const [state, setState] = useState({
        search: "",
        results: [],
        selected: {}
    });

    if (!(type === "movie" || type === "tv")) {
        return <Navigate to="/" replace />;
    }

    const API_URL = "/api?";

    const openPopup = (props) => {
        axios(API_URL + "&i=" + props.id + "&m=" + props.type)
            .then(({ data }) => {

                let result = data;


                setState(prevState => {
                    return { ...prevState, selected: result }
                });
            });
    };

    const closePopup = () => {
        setState(prevState => {
            return { ...prevState, selected: {} }
        });
    };
    return (
        <Fragment>
            <Link to = "/search"> <img className = 'backToSearch' alt = 'back-to-hub' src = { Back } /> </Link>
            <h1 className="myFavorites">Legnépszerűbb {type === "movie"? "filmek" : "sorozatok"}:</h1>
            <main>
                <Results results = { popular } openPopup = { openPopup } />
                {(typeof state.selected.Title != "undefined") ? <Popup selected = { state.selected } closePopup = { closePopup } /> : false}
            </main>
        </Fragment>
    )
}

export default Popular;