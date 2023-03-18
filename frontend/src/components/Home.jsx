import React, {useContext, useEffect, useMemo, useState} from "react";
import '../styles/home.css';
import Back from "../images/back-arrow.png";
import axios from "axios";
import Search from "./Search";
import Results from "./Results";
import Popup from "./Popup";
import Queries from "./Queries";
import {Link} from "react-router-dom";
import {debounce} from "lodash";
import UserContext from "../contexts/userContext";

const Home = () => {

    const [state, setState] = useState({
        search: "",
        results: [],
        query: [],
        selected: {}
    });

    const [isVisible, setIsVisible] = useState(false);

    const API_URL = "/api?";

    const {loggedIn, subscribed} = useContext(UserContext);

    const searchWithButton = () => {
        if (state.search.length !== 0){

            axios(API_URL + "&s=" + state.search)
                .then(({ data }) => {

                    let gainedData = data;

                    setState(prevState => {
                        return { ...prevState, results: gainedData }
                    });

                });
            }
    };


    const searchWithEnter = (intake) => {
        if (state.search.length !== 0){

        if (intake.key === "Enter") {

            axios(API_URL + "&s=" + state.search)
                .then(({ data }) => {

                    let gainedData = data;

                    setState(prevState => {
                        return { ...prevState, results: gainedData }
                    });
                });
        }}
    };




    const handleInput = ({target: {value: intake}}) => {
        setState(prevState => {
            return {...prevState, search: intake}
        });


        if(intake.length !==0){

            axios(API_URL + "&s=" + intake)
                .then(({ data }) => {

                    let gainedData = data;

                    setState(prevState => {
                        return { ...prevState, query: gainedData }
                    });

                    setIsVisible(true)

                });}
        else {
            setIsVisible(false);
            setState(prevState => {
                return { ...prevState, query: "", results: []}
            });
        }
    }

    const debouncedHandleInput = useMemo(() => {
        return debounce(handleInput, 200);
    }, []);

    useEffect(() => {
        return () => {
            debouncedHandleInput.cancel();
        };
    });

    const handleClick = () => {
        setIsVisible(false);
    };



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

    const [clicked, setClicked] = useState(false);
return(
        <div className = "main-home" onClick = { handleClick }>
        <nav className = "home">

            <Link to = "/"> <img className = 'logo' alt = 'back-to-hub' src = { Back } /> </Link>


            <Search handleInput = { debouncedHandleInput } search = { searchWithEnter } button = { searchWithButton }/>


            <div className={`mobileContainer ${clicked ? "active" : ""}`}>
            {
                subscribed &&

                <>
                    <div className="dropdownPopular">
                        <button className="dropbtnPopular">Népszerű</button>
                        <i className="dropdown-arrow"></i>
                        <div className="dropdown-popularContents">
                            <Link to="/popular/movie"> Filmek </Link>
                            <Link to="/popular/tv"> Sorozatok </Link>
                        </div>
                    </div>


                    <div className="dropdown">
                        <button className="dropbtn">Nézőlista</button>
                        <i className="dropdown-arrow"></i>
                        <div className="dropdown-content">
                            <Link to="/watchlist/view"> Megnézendő </Link>
                            <Link to="/watchlist/viewed"> Megnézettek </Link>
                        </div>
                    </div>
                </>
            }


            {
                loggedIn &&
                <Link to = "/favorite" className="getFavoritePosition"> <button className="getFavorite"> Kedvenceim </button> </Link>
            }
            </div>


            <div className="mobileScreen" onClick={() => {
                setClicked(!clicked)
            }}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}> </i>
            </div>


        </nav>
            <div className = {isVisible ? 'visible' : 'hidden'}>
                {state.query && (
                    <ul>
                            <li>
                                <Queries results = { state.query } openPopup = { openPopup }/>
                            </li>
                    </ul>
                )}
            </div>


    <main>
        <Results results = { state.results } openPopup = { openPopup }/>
        {(typeof state.selected.Title != "undefined") ?
            <Popup selected = { state.selected } closePopup = { closePopup } />
            :
            false}
    </main>

        </div>
    );
};

export default Home;