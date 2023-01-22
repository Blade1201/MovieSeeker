import React, {useEffect, useState} from 'react';
import Navbar from "./components/hub/Navbar";
import WhatMovieSeeker from "./components/hub/WhatMovieSeeker";
import Features from "./components/hub/Features";
import Possibility from "./components/hub/Possibility";
import CTA from "./components/hub/CTA";
import Footer from "./components/hub/Footer";
import Header from "./components/hub/Header";
import LoggedInContext from './contexts/loggedin-context';
import isLoggedIn from "./helpers/isLoggedIn";


const Hub = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const value = {loggedIn, setLoggedIn};
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let loader;
        isLoggedIn()
            .then(success => {
                setLoggedIn((prevValue) => {

                    if (success === prevValue) {
                        setLoading(false);
                    } else {
                        loader = setTimeout(() => {
                            setLoading(false);
                        }, 800);
                    }

                    return success;
                });

            });
        return () => clearTimeout(loader);
    }, []);

    return (
        loading ?
            null
            :
            <div>
                <LoggedInContext.Provider value={value}>
                    <Navbar/>
                    <Header/>
                    <WhatMovieSeeker/>
                    <Features/>
                    <Possibility/>
                    <CTA/>
                    <Footer/>
                </LoggedInContext.Provider>
            </div>
    );
}

export default Hub;