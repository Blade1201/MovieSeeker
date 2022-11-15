import React, {useState} from "react";
import axios from "axios";
import Search from "./Search";
import Results from "./Results";
import Popup from "./Popup";
import LogoImage from "../images/logo_transparent.png";

// import Suggestions from "./Suggestions";


function Home(){
    const [state, setState] = useState({
        s: "",
        results: [],
        query: [],
        selected: {}
    });


    const apiurl = "/api?";

    const searchWithButton = () => {
        if (state.s.length !== 0){
            axios(apiurl + "&s=" + state.s)
                .then(({ data }) => {
                    let results = data;

                    setState(prevState => {
                        return { ...prevState, results: results }
                    })

                });
            }
    }


    const searchWithEnter = (e) => {
        if (state.s.length !==0){
        if (e.key === "Enter") {
            axios(apiurl + "&s=" + state.s)
                .then(({ data }) => {
                    let results = data

                    setState(prevState => {
                        return { ...prevState, results: results }
                    })

                });
        }}
    }



    const handleInput = (e) => {
        let s = e.target.value;

        setState(prevState => {
            return { ...prevState, s: s }
        });

        {/*
        if(s.length !==0){
       axios(apiurl + "&s=" + s)
            .then(({ data }) => {
                let results = data;

                setState(prevState => {
                    return { ...prevState, query: results }
                })

            });} */}

        //  console.log(s)
    }



    const openPopup = props => {
        axios(apiurl + "&i=" + props.id + "&m="+ props.type).then(({ data }) => {
            let result = data;

             console.log(result);

            setState(prevState => {
                return { ...prevState, selected: result }
            });
        });
    }




    const closePopup = () => {
        setState(prevState => {
            return { ...prevState, selected: {} }
        });
    }



return(
        <div>
        <div className="navbar">

            <a type="button" className="redirectButton"  href="/authentication">Bejelentkezés</a>


            <a className="href_size_correction" href="/"><img className='logo' alt='logo' src={LogoImage} /></a>
            <Search handleInput = {handleInput} search = {searchWithEnter}/>
            {/* <Suggestions results={state.query}/> */}
            <button className="searchWithButton" onClick={searchWithButton}><span>Keresés</span></button>

        </div>


    <main>
        <Results results={state.results} openPopup={openPopup}/>
        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
    </main>
        </div>
    )
}

export default Home;