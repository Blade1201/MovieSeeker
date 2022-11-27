import React, {useState} from "react";
import '../styles/home.css';
import axios from "axios";
import Search from "./Search";
import Results from "./Results";
import Popup from "./Popup";
import LogoImage from "../images/logo-transparent.png";
import Queries from "./Queries";
import {Link} from "react-router-dom";


const Home = () => {

    const [state, setState] = useState({
        search: "",
        results: [],
        query: [],
        selected: {}
    });

    const [isVisible, setIsVisible] = useState(false);

    const API_URL = "/api?";


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



    const handleInput = (intake) => {
        let typedIntake = intake.target.value;

        setState(prevState => {
            return {...prevState, search: typedIntake}
        });


        if(typedIntake.length !==0){

       axios(API_URL + "&s=" + typedIntake)
            .then(({ data }) => {

                let gainedData = data;

                setState(prevState => {
                    return { ...prevState, query: gainedData }
                });

                setIsVisible(true)

            });}


    };



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




return(
        <div className = "main-home" onClick = { handleClick }>
        <div className = "home">

            <Link className = "logo-href-size-correction" to = "/"> <img className = 'logo' alt = 'logo' src = { LogoImage } /> </Link>


            <Search handleInput = { handleInput } search = { searchWithEnter } button = { searchWithButton }/>



        </div>
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
        {(typeof state.selected.Title != "undefined") ? <Popup selected = { state.selected } closePopup = { closePopup } /> : false}
    </main>

        </div>
    );
};

export default Home;