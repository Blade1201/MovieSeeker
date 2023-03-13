import React, {Fragment, useContext, useEffect, useState} from "react";
import axios from "axios";
import {Link, Navigate, useParams} from "react-router-dom";
import Back from "../images/back-arrow.png";
import Popup from "./Popup";
import WatchlistResults from "./WatchlistResults";
import {WatchListContext} from "../contexts/watchlistContext";

const GetWatchlist = () => {

    const {type} = useParams();

    const {getWatchlistByType, watchlist} = useContext(WatchListContext);

    const [actualWatchlist, setActualWatchlist] = useState(getWatchlistByType(type));

    useEffect(() => {
        console.log("Itt");
        setActualWatchlist(getWatchlistByType(type));
    }, [watchlist]);

    const [state, setState] = useState({
        search: "",
        results: [],
        selected: {}
    });

    if (!(type === "viewed" || type === "view")) {
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
            <h1 className="myFavorites">{type === "viewed" ? "Megnézettek": "Megnézendő"}</h1>
            <main>
                <WatchlistResults results = { actualWatchlist } openPopup = { openPopup } type = {type} />
                {(typeof state.selected.Title != "undefined") ? <Popup selected = { state.selected } closePopup = { closePopup } /> : false}
            </main>
        </Fragment>
    )
}

export default GetWatchlist;