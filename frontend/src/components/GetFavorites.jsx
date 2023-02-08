import React, {Fragment, useContext, useState} from "react";
import "../styles/favorite.css"
import axios from "axios";
import Popup from "./Popup";
import FavoriteResults from "./FavoriteResults";
import {FavoriteContext} from "../contexts/favoriteContext";

const GetFavorites = () => {

    const [state, setState] = useState({
        search: "",
        results: [],
        selected: {}
    });

    const {favorites} = useContext(FavoriteContext);

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
            <h1>Kedvencei: </h1>
            <main>
                <FavoriteResults results = { favorites } openPopup = { openPopup } />
                {(typeof state.selected.Title != "undefined") ? <Popup selected = { state.selected } closePopup = { closePopup } /> : false}
            </main>
        </Fragment>
    )
}

export default GetFavorites;