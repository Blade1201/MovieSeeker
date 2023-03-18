import React, {Fragment, useContext, useState} from "react";
import "../styles/favorite.css"
import axios from "axios";
import Popup from "./Popup";
import FavoriteResults from "./FavoriteResults";
import {FavoriteContext} from "../contexts/favoriteContext";
import Back from "../images/back-arrow.png";
import {Link} from "react-router-dom";

const GetFavorites = () => {
    const [state, setState] = useState({
        search: "",
        results: [],
        selected: {}
    });

    const {favorites} = useContext(FavoriteContext);

    const API_URL = "/api?";

    const openPopup = ({id, type}) => {
        axios(API_URL + "&i=" + id + "&m=" + type)
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
            <h1 className="myFavorites">Kedvenceim: </h1>
            <main>
                <FavoriteResults results = { favorites } openPopup = { openPopup } />
                {(typeof state.selected.Title != "undefined") ? <Popup selected = { state.selected } closePopup = { closePopup } /> : false}
            </main>
        </Fragment>
    )
}

export default GetFavorites;