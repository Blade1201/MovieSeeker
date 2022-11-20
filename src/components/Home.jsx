import React, {useState} from "react";
import '../styles/home.css';
import axios from "axios";
import Search from "./Search";
import Results from "./Results";
import Popup from "./Popup";
import LogoImage from "../images/logo-transparent.png";
import Queries from "./Queries";



const Home = () => {

    const [state, setState] = useState({
        search: "",
        results: [],
        query: [],
        selected: {}
    });


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

            });}

        setIsVisible(true)
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

    const [isVisible, setIsVisible] = useState(true);

    const handleClick = () => {
        setIsVisible(false);
    };

return(
        <div onClick={handleClick}>
        <div className = "home">

            <a className = "logo-href-size-correction" href = "/"><img className = 'logo' alt = 'logo' src = {LogoImage} /></a>


            <Search handleInput = { handleInput } search = { searchWithEnter }/>

            <button className = "search-button" onClick = { searchWithButton }><span> Keresés </span></button>

            <a type = "button" className = "redirect-button"  href = "/authentication"> Bejelentkezés </a>


        </div>
            <div className={isVisible ? 'visible' : 'hidden'}>
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